const crypto =  require('crypto-random-string');
// const  {sendVerificationEmail}  = require('./EmailVerify');
require('dotenv').config()
const sendGrid = require('sendgrid').mail;
const sg = require('sendgrid')(process.env.SendGridApiKey);


const Sequelize = require('sequelize');
// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: 'telemedicine',
  username: 'root',
  password: 'Anup@1999',
  dialect: 'mariadb',
  host:'localhost',
  port:'3307',
});
const Doctor = require('../models/doctor')(sequelize, Sequelize.DataTypes);
const VerificationToken2 = require('../models/VerificationToken2')(sequelize, Sequelize.DataTypes);

const sendVerificationEmail = (to, token) => {
    const hostUrl = process.env.hostURL;
    const request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: {
        personalizations: [
          {
            to: [
              {
                email: to
              }
            ],
            subject:"Verify Your Email"
          }
        ],
        from: {
          email: "anup.anup.73@gmail.com"
        },
        content: [
      {
        type: 'text/plain',
        value: `Click on this link to verify your email ${process.env.hostURL}/doctorEmail/verification?token=${token}&email=${to}`
      }
    ]
      }
    });
    return new Promise(function (resolve, reject) {
      sg.API(request, function (error, response) {
        if (error) {
          return reject(error);
        }
        else {
          return resolve(response);
        }
      });
    });
  };


const SignUpDoctor = async (req, res, next) => {
  const [user, created] = await Doctor.findOrCreate({
    where: { email:  req.body.email },
    defaults: req.body
  })
    // if user email already exists
    try{
        if(!created) {
        return res.status(409).json('User with email address already exists');
        } else {
          console.log('user.id', user.id)
        return await VerificationToken2.create({
            docId: user.id,
            token: crypto(16)
        }).then((result) => {
            console.log('result:',result)
            console.log('user:',user)

            sendVerificationEmail(user.email, result.token);
            return res.status(200).json(`${user.email} account created successfully`);
        }).
      catch((error) => {
          console.log('error:',error)
        return res.status(500).json(error);
      })
    }
  }
  catch{(error) => {
    return res.status(500).json(error);
  }};
};
module.exports = SignUpDoctor;