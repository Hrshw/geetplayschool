const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., Gmail, Yahoo, etc.
  auth: {
    user: 'gpschandgothi@gmail.com',
    pass: 'orybwqywnaxpgrhh',
  },
});

const sendContactForm = (req, res) => {
  // Extract form data from request body
  const { name, email, subject, message } = req.body;

  // Create email message
  const mailOptions = {
    from: `${name} <${email}>`,
    to: 'gpschandgothi@gmail.com',
    subject: subject,
    text: message,
    userEmail: {email} ,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent successfully');
      res.json({ success: true, message: 'Thank you for your message!' });
    }
  });
};

// Export the controller function
module.exports = {
  sendContactForm,
};
