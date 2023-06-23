const sendEmail = require('../middleware/sendMail');

// Form submission handler
const handleFormSubmission = (req, res) => {
  // Extract the form data from the request body
  const { gname, gemail, childname, childAge, message } = req.body;

  // Call the sendEmail function to send the email
  sendEmail({ gname, gemail, childname, childAge, message });

  // Respond with a success message
  res.send('Thank you for your submission!');
};

module.exports = {handleFormSubmission};