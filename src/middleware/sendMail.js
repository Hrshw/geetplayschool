const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., Gmail, Yahoo, etc.
  auth: {
    user: 'gpschandgothi@gmail.com',
    pass: 'Rahul1992@',
  },
});

// Function to send the email
const sendEmail = async (formData) => {
  try {
    // Extract form data
    const { gname, gemail, childname, childAge, message } = formData;

    // Create the email message
    const mailOptions = {
        from: `${gname} <${gemail}>`,
        to: 'gpschandgothi@gmail.com', // Update with your email address
        subject: 'New Form Submission',
        text: `
          Guardian Name: ${gname}
          Guardian Email: ${gemail}
          Child Name: ${childname}
          Child Age: ${childAge}
          Message: ${message}
        `,
      };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
