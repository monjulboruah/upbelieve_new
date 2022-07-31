const nodemailer = require("nodemailer");

const sendEmail = (email, pinCode, currStatus, totalIncident) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "monjul_ug@ei.nits.ac.in",
      pass: "#Monjul*2023",
    },
  });

  const mailOptions = {
    from: "support@upbelieve.com",
    to: email,
    subject: "Regarding change of status of your zone",
    text: `Your zone ${pinCode}'s is changed to ${currStatus}, please take necessary action to avoid further incidents. You zone has a total of ${totalIncident} incidents right now`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
