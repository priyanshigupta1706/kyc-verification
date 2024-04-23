// const express = require('express');
// const nodemailer = require('nodemailer');
// //const cors = require('cors');
// const app = express();
// app.use(express.json());

// // app.use(cors({
// //   origin: 'http://localhost:8080', // or '*' for allowing all origins
// //   methods: 'GET,POST',
// //   allowedHeaders: 'Content-Type,Authorization',
// // }));


// // Create a transporter to send emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Replace with your email service provider
//   auth: {
//     user: 'priyanshayyy@gmail.com', // Replace with your email address
//     pass: 'dgkx buok arfr vdgk', // Replace with your email password or app-specific password
//   },
// });

// // Route to handle sending OTP
// // app.post('/sendOTP', async (req, res) => {
// //   const { email } = req.body;
// //   const otpToSend = generateOTP(); // Generate OTP
// //   const isSent = await sendOTPByEmail(email, otpToSend); // Send OTP via email

// //   if (isSent) {
// //     res.status(200).json({ message: 'OTP sent successfully' });
// //   } else {
// //     res.status(500).json({ message: 'Failed to send OTP' });
// //   }
// // });

// // Function to send OTP via email
// const sendOTPByEmail = async (email, otp) => {
//   try {
//     const info = await transporter.sendMail({
//       from: 'priyanshayyy@gmail.com',
//       to: email, // Confirm 'email' is a valid recipient's email
//       subject: 'Your OTP',
//       text: `Your OTP is: ${otp}`
//     });

//     console.log('OTP email sent:', info.messageId);
//     return true;
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     return false;
//   }
// };



// // Function to generate a random 4-digit OTP
// const generateOTP = () => {
//   return Math.floor(1000 + Math.random() * 9000).toString();
// };

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });
