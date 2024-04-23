const express = require('express');
const app = express();
var mysql = require('mysql');
const bodyparser = require('body-parser');
const sequelize = require("sequelize");
const db=require("./server.js");
const registeredusers=require("./registeredusers");
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const T = require('tesseract.js');

app.use(bodyparser.json());


app.use(cors({
  origin: 'http://localhost:8080', 
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization',
}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials","true");
    res.header("Access-Control-Request-Method", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
 next();
 });



 app.post('/kyc-verification',(req,res)=>{
    con.query("", function (err, result, fields) {
       if (err) throw err;
       res.send(result);
     });
 })
 
 app.post('/registeredusers',(req,res)=>{
    var name = req.body.name;
    var email=req.body.email;
    var password=req.body.password;
 
    registeredusers.create({
       Name:name,
       Email:email,
       Password:password,
       Status:'1'
 
    }).then((result) => {
       res.send(result);
     }).catch((error) => {
       console.error(error); 
     });
     
    });
 
    app.post('/login',(req,res)=>{
      var Email = req.body.email;
      var Password = req.body.password;
    
      registeredusers.count({
        where:{ Email , Password}
      })
      .then(data => {
        console.log(data); 
        if(data==1 ){
          res.status(200).send("Success");
        }else{
        res.status(402).send("Invalid username or password");
        }
       })
       .catch(error => {
        res.status(500).send("something went wrong with backend");
      })
    });


    const transporter = nodemailer.createTransport({
      service: 'gmail', // Replace with your email service provider
      auth: {
        user: 'priyanshayyy@gmail.com', // Replace with your email address
        pass: 'dgkx buok arfr vdgk', // Replace with your email password or app-specific password
      },
    });


    app.post('/sendOTP', async (req, res) => {
      const { email } = req.body;
      const otpToSend = generateOTP(); // Generate OTP
      const isSent = await sendOTPByEmail(email, otpToSend); // Send OTP via email
    
      if (isSent) {
        res.status(200).json({ message: otpToSend });
      } else {
        res.status(500).json({ message: 'Failed to send OTP' });
      }
    });

    const sendOTPByEmail = async (email, otp) => {
      try {
        const info = await transporter.sendMail({
          from: 'priyanshayyy@gmail.com',
          to: email, // Confirm 'email' is a valid recipient's email
          subject: 'Your OTP',
          text: `Your OTP is: ${otp}`
        });
    
        console.log('OTP email sent:', info.messageId);
        return true;
      } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
      }
    };
    
    
    
    // Function to generate a random 4-digit OTP
    const generateOTP = () => {
      return Math.floor(1000 + Math.random() * 9000).toString();
    };
    
    const storage = multer.diskStorage({
      destination: './uploads/',
      filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
      },
    });
    
    const upload = multer({
      storage: storage,
      limits: { fileSize: 10000000 }, // Adjust file size limit as needed
    }).single('image'); // 'image' should match the field name in the form data
    
   

    
    app.post('/upload', (req, res) => {
      upload(req, res, (err) => {
        if (err) {
          res.status(500).json({ message: 'Error uploading file', error: err });
        } else {
          if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
          } else {
            res.status(200).json({ message: 'File uploaded successfully', file: req.file });
          }
        }
      });
    }
    );
    
    
    app.post('/upload', (req, res) => {
      if (!req.file) {
        return res.status(400).send('No file was uploaded.');
      }
      // Handle the uploaded image file here (e.g., save to a database)
      res.status(200).send('Image uploaded!');
    });



    const uploads = multer({ storage });
    app.post('/uploadVideoDifferent', uploads.single('video'), (req, res) => {
      if (!req.file) {
        return res.status(400).send('No file was uploaded.');
      }
      // Handle the uploaded video file here (e.g., save to a database)
      res.status(200).send('Video uploaded!');
    });
    

    

T.recognize('./uploads/image-1704209393531.png' , 'eng+hin' , { logger: e => console.log(e)})
 .then(out => console.log(out.data.text))
    
db.sync();


const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server is running on port `,port);
  });