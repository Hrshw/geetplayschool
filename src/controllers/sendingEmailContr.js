const nodemailer = require('nodemailer');

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail, Yahoo, etc.
    auth: {
        user: 'gpschandgothi@gmail.com',
        pass: 'orybwqywnaxpgrhh',
    },
  });
  
  module.exports = {
    submitForm: (req, res) => {
      // Extract form data from request body
      const { gname, gemail, childname, childAge, message } = req.body;
  
      // Create email message
      const mailOptions = {
        from: `${gname} <${gemail}>`,
        to: 'gpschandgothi@gmail.com',
        subject: 'New Form Submission for Appointment',
        text: `
          Guardian Name: ${gname}
          Guardian Email: ${gemail}
          Child Name: ${childname}
          Child Age: ${childAge}
          Message: ${message}
        `,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
          console.log('Email sent successfully');
          res.json({ success: true, message: 'Thank you for your submission!' });
        }
      });
    },
  };
  