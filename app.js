const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
var smtpTransport = require("nodemailer-smtp-transport");

const app = express();

app.engine("handlebars", exphbs.engine({ defaultLayout: false }));
app.set("view engine", "handlebars");

// startic folder
app.use("/public", express.static(path.join(__dirname, "./public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  const output = `
  <p> You have a new contact request </p>
  <h3> Contact Details </p>
  <ul> 
    <li> Name: ${req.body.name} </li>
    <li> Email: ${req.body.email} </li>
    <li> Subject: ${req.body.subject} </li>
    <li> Phone: ${req.body.message} </li>
  </ul>
  `;

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "davidkimani1357@gmail.com",
        // pass: "ronpgfdhbqpbnoap",
        pass: "fzxengnvsuabjtjn",
      },
    })
  );

  var mailOptions = {
    from: `${req.body.email}`,
    to: "davidkimani1357@gmail.com",
    subject: `from webpage ${req.body.subject}`,
    text: `${req.body.message}, \n\n\n\n this message was sent by ${req.body.email}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // // async..await is not allowed in global scope, must use a wrapper
  // async function main() {
  //     // Generate test SMTP service account from ethereal.email
  //     // Only needed if you don't have a real mail account for testing
  //     let testAccount = await nodemailer.createTestAccount();

  //     // create reusable transporter object using the default SMTP transport
  //     let transporter = nodemailer.createTransport({
  //       host: "mail.gmail.com",
  //       port: 587,
  //       secure: false, // true for 465, false for other ports
  //       auth: {
  //         user: 'davidkimani1357@gmail.com', // generated ethereal user
  //         pass: 'Dknj#2022', // generated ethereal password
  //       },
  //     });

  //     // send mail with defined transport object
  //     let info = await transporter.sendMail({
  //       from: '"Nodemailer Contact" <davidkimani1357@gmail.com>', // sender address
  //       to: "davidkimani1357@gmail.com, daviekim1305@gmail.com", // list of receivers
  //       subject: "message sent: ", // Subject line
  //       text: "Hello world?", // plain text body
  //       html: output, // html body
  //     });

  //   console.log("Message sent: %s", info.messageId);
  //   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.render("contact", { msg: "Email has been sent thank you" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("server started");
});

// var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');

// var transporter = nodemailer.createTransport(smtpTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   auth: {
//     user: 'somerealemail@gmail.com',
//     pass: 'realpasswordforaboveaccount'
//   }
// }));

// var mailOptions = {
//   from: 'somerealemail@gmail.com',
//   to: 'friendsgmailacc@gmail.com',
//   subject: 'Sending Email using Node.js[nodemailer]',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
