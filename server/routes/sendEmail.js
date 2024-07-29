// sendEmail.js
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const PORT =  8080;

app.use(express.json());

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object with your Gmail credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rohitmetha111@gmail.com', // Your Gmail account
      pass: 'Rohit1*3#', // Your Gmail password or App Password
    },
  });

  // Set up email data
  const mailOptions = {
    from: email,
    to: 'rohitmetha111@gmail.com', // Your Gmail account
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Failed to send email.');
    }
    console.log('Email sent:', info.response);
    res.send('Email sent successfully!');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
