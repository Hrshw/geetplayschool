const sendingEmailController = require('../controllers/sendingEmailContr');
const contactFormController = require('../controllers/contactFormController');

module.exports = (app) => {
    // Other routes and middleware
  
    // Handle form submission
    app.post('/submit-form', sendingEmailController.submitForm);
    app.post('/submit-contact-form', contactFormController.sendContactForm);

  };
  