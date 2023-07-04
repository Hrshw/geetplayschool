const sendingEmailController = require('../controllers/sendingEmailContr');
const contactFormController = require('../controllers/contactFormController');
const AdmissionForm = require('../DB-Connections/models/admissionSchema');
const AdminUser = require('../DB-Connections/models/adminUserSchema');
const VlogContent = require('../DB-Connections/models/vlogContent')
const authenticateUserMiddleware = require('../middleware/authanticateUser');
const hbs= require('hbs');
const path = require('path')
const multer = require('multer');
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing

module.exports = (app) => {
  // Handle form submission
  app.post('/submit-admissionform', (req, res) => {
    const formData = new AdmissionForm(req.body);

    formData.save((err) => {
      if (err) {
        console.error('Error saving form data:', err);
        res.status(500).json({ error: 'An error occurred while saving the form data' });
      } else {
        res.status(200).json({ message: 'Form data saved successfully' });
      }
    });
  });

  app.post('/submit-form', sendingEmailController.submitForm);
  app.post('/submit-form2', sendingEmailController.submitForm);
  app.post('/submit-contact-form', contactFormController.sendContactForm);

  app.get('/authentication-login', (req, res) => {
    // Render the login page template
    res.render('authentication-login');
  });

  // POST route for handling login form submission
  app.post('/authentication-login', (req, res) => {
    const { username, password } = req.body;

    // Find the admin user by username
    AdminUser.findOne({ username })
      .then((admin) => {
        if (!admin) {
          // Admin user not found
          return res.render('authentication-login', { error: 'Invalid credentials' }); // Replace with the actual error handling logic
        }

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, admin.password)
          .then((isMatch) => {
            if (isMatch) {
              // Passwords match, create a session and store the user ID
              req.session.userId = admin._id;
              res.redirect('/dashboard'); // Replace with the actual admin page route
            } else {
              // Passwords do not match
              res.render('authentication-login', { error: 'Invalid credentials' }); // Replace with the actual error handling logic
            }
          })
          .catch((err) => {
            console.error('Error comparing passwords:', err);
            res.render('authentication-login', { error: 'An error occurred' }); // Replace with the actual error handling logic
          });
      })
      .catch((err) => {
        console.error('Error finding admin user:', err);
        res.render('authentication-login', { error: 'An error occurred' }); // Replace with the actual error handling logic
      });
  });

// Route for fetching admission form data
app.get('/api/admission-form-data', (req, res) => {
  // Fetch admission form data from the database
  AdmissionForm.find()
    .then(forms => {
      // Count the number of submitted forms for each student
      const formCounts = {};
      forms.forEach(form => {
        if (form.studentName in formCounts) {
          formCounts[form.studentName]++;
        } else {
          formCounts[form.studentName] = 1;
        }
      });

      // Convert formCounts object into an array of objects
      const formData = Object.keys(formCounts).map(studentName => ({
        studentName,
        count: formCounts[studentName]
      }));

      // Send the admission form data as JSON response
      res.json(formData);
    })
    .catch(error => {
      console.error('Error fetching admission form data:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});



  // Middleware to check if the user is authenticated
  app.use('/dashboard', authenticateUserMiddleware);

  
// Route for rendering the dashboard page
app.get('/dashboard', (req, res) => {
  // Fetch recently submitted form data
  AdmissionForm.find()
    .sort({ submittedAt: -1 }) // Sort by createdAt field in descending order to get the most recent submissions first
    .limit(5) // Limit the number of results to 10 (you can adjust this as needed)
    .then(forms => {
      // Modify the forms data to include a sequential number
      const modifiedForms = forms.map((form, index) => {
        return { ...form._doc, number: index + 1 };
      });

      // Render the dashboard template and pass the modified forms data as data
      res.render('dashboard', { forms: modifiedForms });
    })
    .catch(error => {
      console.error('Error fetching recent submissions:', error);
      res.render('dashboard', { error: 'An error occurred' });
    });
});



app.get('/ui-forms', authenticateUserMiddleware, (req, res) => {
  // Fetch all Admission form data
  AdmissionForm.find()
    .then(forms => {
      // Render the ui-forms template and pass the Admission form data as data
      res.render('ui-forms', { forms });
    })
    .catch(error => {
      console.error('Error fetching Admission form data:', error);
      res.render('ui-forms', { error: 'An error occurred' });
    });
});
// Route for deleting a form
app.delete('/ui-forms/:id', authenticateUserMiddleware, (req, res) => {
  const formId = req.params.id;
  
  // Find the form by ID and delete it
  AdmissionForm.findByIdAndDelete(formId)
    .then(() => {
      res.status(200).json({ message: 'Form deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting form:', error);
      res.status(500).json({ error: 'An error occurred while deleting the form' });
    });
});

// Route for updating a form
app.put('/ui-forms/:id', authenticateUserMiddleware, (req, res) => {
  const formId = req.params.id;
  const updatedData = req.body;

  // Find the form by ID and update it
  AdmissionForm.findByIdAndUpdate(formId, updatedData)
    .then(() => {
      res.status(200).json({ message: 'Form updated successfully' });
    })
    .catch(error => {
      console.error('Error updating form:', error);
      res.status(500).json({ error: 'An error occurred while updating the form' });
    });
});


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/vlog-files'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    const filePath = filename.replace(/\\/g, '/'); // Replace backslashes with forward slashes
    cb(null, filePath);
  }
});

const upload = multer({ storage });

app.get('/vlog-management',authenticateUserMiddleware, (req, res) => {
  res.render('vlog-management');
});

app.post('/submit-vlog', upload.single('media'), (req, res) => {
  const { title, description } = req.body;
  const mediaPath = req.file ? req.file.path : null;

  const vlogContent = new VlogContent({
    title,
    description,
    media: mediaPath
  });

  vlogContent.save()
    .then(savedVlogContent => {
      // console.log('Vlog content saved:', savedVlogContent);
      res.render('vlog-management', { successMessage: 'Vlog content saved successfully' });
    })
    .catch(error => {
      console.error('Error saving vlog content:', error);
      res.render('vlog-management', { errorMessage: 'Error saving vlog content' });
    });
});


app.get('/vlog', (req, res) => {
  VlogContent.find({})
    .then((vlogContents) => {
      res.render('vlog', { vlogContents });
    })
    .catch((err) => {
      console.error('Error retrieving vlog contents:', err);
      res.sendStatus(500);
    });
});

};
