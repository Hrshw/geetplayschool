require('dotenv').config({ path: './config.env' });
const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const route = require('./src/routers/route');
const fs = require('fs');
const hbs= require('hbs');
const sessionMiddleware = require('./src/middleware/session');
const port = process.env.PORT || 3030;



// Database related code
require('./src/DB-Connections/conn');

// Import the AdmissionForm model
const AdmissionForm = require('./src/DB-Connections/models/admissionSchema');
// const AdminUser = require('./src/DB-Connections/models/adminUserSchema');

// const admin = new AdminUser({
//   username: 'RahulSangwan870',
//   password: 'GPS!!@123gpsrahul',
// });

// // Generate a salt to use for hashing
// bcrypt.genSalt(10, (err, salt) => {
//   if (err) {
//     console.error('Error generating salt:', err);
//     return;
//   }

//   // Hash the password using the generated salt
//   bcrypt.hash(admin.password, salt, (err, hash) => {
//     if (err) {
//       console.error('Error hashing password:', err);
//       return;
//     }

//     // Store the hashed password in the admin object
//     admin.password = hash;

//     // Save the admin user to the database
//     admin.save()
//       .then(() => {
//         console.log('Admin user created successfully');
//       })
//       .catch((err) => {
//         console.error('Error creating admin user:', err);
//       });
//   });
// });

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(sessionMiddleware);
app.set('trust proxy', 1);


// Serve static files for admission form uploads
const admissionFormUploadPath = path.join(__dirname, 'uploads');
app.use('/uploads/admission-form', express.static(admissionFormUploadPath));

// Serve static files for vlog uploads
const vlogUploadPath = path.join(__dirname, 'uploads', 'vlog-files');
app.use('/uploads/vlog-files', express.static(vlogUploadPath));

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
// Set up Handlebars as the template engine
app.set('view engine', 'hbs');

// Define the views directory
app.set('views', path.join(__dirname, 'src/views'));



// Helper function to format the date
hbs.registerHelper('formatDate', function (date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);
  return formattedDate;
});

// Helper function to format the time
hbs.registerHelper('formatTime', function (date) {
  const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedTime = new Date(date).toLocaleTimeString('en-US', options);
  return formattedTime;
});

// Define the checkImageType helper function
hbs.registerHelper('checkImageType', function (media) {
  return media && (media.endsWith('.jpg') || media.endsWith('.jpeg') || media.endsWith('.png'));
});

hbs.registerHelper('checkVideoType', function (media) {
  return media && (media.endsWith('.mp4') || media.endsWith('.avi') || media.endsWith('.mov'));
});



// Define the storage and file type filter for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    fs.mkdirSync(uploadPath, { recursive: true }); // Create the 'uploads' directory if it doesn't exist
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, and JPG files are allowed.'), false);
  }
};


// Create multer upload instance with increased file size limit
const upload = multer({
  storage,
  fileFilter,
  limits: {fileSize: 7 * 1024 * 1024}, // 7MB limit
});

// Form field validation rules
const validateForm = [
  check('studentName').notEmpty().withMessage('Student name is required'),
  check('gender').notEmpty().withMessage('Gender is required'),
  check('dob').notEmpty().withMessage('Date of birth is required'),
  check('adharNumber').notEmpty().withMessage('Aadhaar number is required'),
  check('mobileNumber').notEmpty().withMessage('Mobile number is required'),
  check('fatherName').notEmpty().withMessage("Father's name is required"),
  check('fatherOccupation').notEmpty().withMessage("Father's occupation is required"),
  check('fatherAddress').notEmpty().withMessage("Father's address is required"),
  check('fatherEmail').notEmpty().withMessage("Father's email is required"),
  check('fatherMobileNo').notEmpty().withMessage("Father's mobile number is required"),
  check('motherName').notEmpty().withMessage("Mother's name is required"),
  check('motherOccupation').notEmpty().withMessage("Mother's occupation is required"),
  check('motherAddress').notEmpty().withMessage("Mother's address is required"),
  check('motherEmail').notEmpty().withMessage("Mother's email is required"),
  check('motherMobileNo').notEmpty().withMessage("Mother's mobile number is required"),
  // check('birthCertificateFile').notEmpty().withMessage("Birth Certificate is required"),
  // check('adharCardFile').notEmpty().withMessage("Adhar Card is required"),
];

// Handle form submission
app.post(
  '/submit-admissionform',
  upload.fields([
    { name: 'birthCertificateFile', maxCount: 1 },
    { name: 'adharCardFile', maxCount: 1 },
    { name: 'casteCertificateFile', maxCount: 1 },
    { name: 'incomeCertificateFile', maxCount: 1 },
    { name: 'transferCertificateFile', maxCount: 1 },
    { name: 'otherCertificateFile', maxCount: 1 },
  ]),
  validateForm,
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract the filenames from req.files and store in respective fields
      const {
        birthCertificateFile,
        adharCardFile,
        casteCertificateFile,
        incomeCertificateFile,
        transferCertificateFile,
        otherCertificateFile,
      } = req.files;

      // Create a new AdmissionForm instance with form data
      // console.log('Received form data:', req.body);
      const formData = new AdmissionForm({
        studentName: req.body.studentName,
        gender: req.body.gender,
        dob: req.body.dob,
        adharNumber: req.body.adharNumber,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        religion: req.body.religion,
        castCategory: req.body.castCategory,
        nationality: req.body.nationality,
        bonafideState: req.body.bonafideState,
        janAadharNo: req.body.janAadharNo,
        classAdmissionSought: req.body.classAdmissionSought,
        lastSchool: req.body.lastSchool,
        parentDetails: {
          father: {
            fatherName: req.body.fatherName,
            fatherEducation: req.body.fatherEducation,
            fatherEmail: req.body.fatherEmail,
            fatherOccupation: req.body.fatherOccupation,
            fatherAddress: req.body.fatherAddress,
            fatherIncome: req.body.fatherIncome,
            fatherAdharNo: req.body.fatherAdharNo,
            fatherJanAadharNo: req.body.fatherJanAadharNo,
            fatherMobileNo: req.body.fatherMobileNo
          },
          mother: {
            motherName: req.body.motherName,
            motherEducation: req.body.motherEducation,
            motherEmail: req.body.motherEmail,
            motherOccupation: req.body.motherOccupation,
            motherAddress: req.body.motherAddress,
            motherIncome: req.body.motherIncome,
            motherAdharNo: req.body.motherAdharNo,
            motherJanAadharNo: req.body.motherJanAadharNo,
            motherMobileNo: req.body.motherMobileNo
          }
        },
        classLastAttended: req.body.classLastAttended,
        passingYearLastClass: req.body.passingYearLastClass,
        lastSchoolAffiliated: req.body.lastSchoolAffiliated,
        otherAffiliation: req.body.otherAffiliation,
        lastClassMarks: req.body.lastClassMarks,
        originalCertificates: {
          birthCertificateFile: birthCertificateFile && birthCertificateFile[0] ? birthCertificateFile[0].filename : '',
          adharCardFile: adharCardFile && adharCardFile[0] ? adharCardFile[0].filename : '',
          casteCertificateFile: casteCertificateFile && casteCertificateFile[0] ? casteCertificateFile[0].filename : '',
          incomeCertificateFile: incomeCertificateFile && incomeCertificateFile[0] ? incomeCertificateFile[0].filename : '',
          transferCertificateFile: transferCertificateFile && transferCertificateFile[0] ? transferCertificateFile[0].filename : '',
          otherCertificateFile: otherCertificateFile && otherCertificateFile[0] ? otherCertificateFile[0].filename : '',
        }        
      });
      if (!req.files || !req.files.adharCardFile || !req.files.birthCertificateFile) {
        return res.status(400).json({
          errors: [
            { msg: "Adhar Card File and Birth Certificate File are required." }
          ]
        });
      }
      // Save the AdmissionForm instance to the database
      const savedForm = await formData.save();
  
      // Send a response indicating successful form submission
      res.status(200).json({ message: 'Form submitted successfully' });
        // Emit a notification event to connected clients
    io.emit('notification', { message: 'New form submitted' });
    } catch (error) {
      // Handle any errors that occurred during form submission
      console.error('An error occurred during form submission:', error);
      res.status(500).json({ error: 'Form submission failed' });
    }
  }
);


route(app); // Pass the app instance to the route module

app.get('*', (req, res) => {
  let filePath = path.join(publicPath, req.path);

  // Append .html extension if the file doesn't exist without it
  if (!filePath.endsWith('.html')) {
    filePath += '.html';
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      // Handle file not found error
      res.status(404).send('File not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
