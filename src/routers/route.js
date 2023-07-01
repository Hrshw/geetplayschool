const sendingEmailController = require('../controllers/sendingEmailContr');
const contactFormController = require('../controllers/contactFormController');
const AdmissionForm = require('../DB-Connections/models/admissionSchema');

module.exports = (app) => {
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

    // Handle form submission
    app.post('/submit-form', sendingEmailController.submitForm);
    app.post('/submit-form2', sendingEmailController.submitForm);
    app.post('/submit-contact-form', contactFormController.sendContactForm);

  };