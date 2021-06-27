const { sendVerificationEmail } = require('./EmailVerify');
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


const VerificationDoctor = async (req, res) => {
    return await Doctor.findOne({
      where: { email: req.query.email }
    })
      .then(async user => {
        if (user.isVerified) {
          return res.status(202).json(`Email Already Verified`);
        } else {
            console.log('user:',user)
            let did=user.id;
          return await VerificationToken2.findAll({
           // where: { token: req.query.verificationToken }
           where: {docId: did}
          })
            .then((foundToken) => {
                console.log(foundToken)
              if(foundToken){
                return user
                  .update({ isVerified: true })
                  .then(updatedUser => {
                    return res.status(403).json(`User with ${user.email} has been verified`);
                  })
                  .catch(reason => {
                    return res.status(403).json(`Verification failed`);
                  });
              } else {
                return res.status(404).json(`Token expired` );
              }
            })
            .catch(reason => {
              return res.status(404).json(`Token expired`);
            });
        }
      })
      .catch(reason => {
        return res.status(404).json(`Email not found`);
      })};
    
  module.exports = VerificationDoctor;