const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const nodemailer = require("nodemailer");
const http=require("http")
const app = express();
const session=require('express-session')
const bcrypt = require("bcrypt");
const SocketIo=require("socket.io")
const cloudinary = require("cloudinary").v2;
require('dotenv').config()
const multer  = require('multer')
const saltRounds = 10;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function(req, file, cb) {
        cb(null, './uploads ')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
////////////////////////////////////////////////
/////////// Nodemailer Configuration
// var smtpTransport = nodemailer.createTransport("SMTP",{
//   service: "Gmail",
//   auth: {
//       user: "",
//       pass: "Gmail Password"
//   }
// });
// var rand,mailOptions,host,link;
//////////////////////////////////////////////////////
//const storage=multer.memoryStorage()
const multerUploads = multer({ storage : storage }).single('image');
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
// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));


  const User = require('./models/user')(sequelize, Sequelize.DataTypes)
  const Parameter = require('./models/parameter')(sequelize, Sequelize.DataTypes);
  const Prescription = require('./models/prescription')(sequelize, Sequelize.DataTypes);
  const Report = require('./models/report')(sequelize, Sequelize.DataTypes);
  const Doctor = require('./models/doctor')(sequelize, Sequelize.DataTypes);
  const Detail = require('./models/detail')(sequelize, Sequelize.DataTypes);
  const Education=require('./models/education')(sequelize, Sequelize.DataTypes);
  const Hospital=require('./models/hospital')(sequelize, Sequelize.DataTypes);
  const Appointment=require('./models/appointment')(sequelize, Sequelize.DataTypes);
  const Comment = require('./models/comments')(sequelize, Sequelize.DataTypes);
  
  User.hasOne(Parameter)//,{as: 'parameter'});
  User.hasMany(Prescription,{as: 'prescription'});
  Doctor.hasMany(Appointment,{as: 'appointment'});
  User.hasMany(Report,{as: 'report'});
  Doctor.hasOne(Detail,{as: 'detail'})
  Doctor.hasMany(Education,{as: 'education'})
  Doctor.hasMany(Hospital,{as: 'hospital'})
  Detail.belongsTo(Doctor,{as: 'doctor',foreignKey : 'doctorId'});
  Parameter.belongsTo(User,{as: 'user',foreignKey : 'patientId'});
  Prescription.belongsTo(User,{as: 'user',foreignKey : 'patientId'});
  Report.belongsTo(User,{as: 'user',foreignKey : 'patientId'});
  Education.belongsTo(Doctor,{as: 'doctor',foreignKey : 'DoctorId'});
  Hospital.belongsTo(Doctor,{as: 'doctor',foreignKey : 'DoctorId'});
  Appointment.belongsTo(Doctor,{as: 'doctor',foreignKey : 'DoctorId'})
  Appointment.belongsTo(User,{as: 'user',foreignKey : 'patientId'})
  // Comment.belongsTo(Doctor,{as: 'doctor',foreignKey : 'DoctorEmail'})
  // Comment.belongsTo(User,{as: 'user',foreignKey : 'PatientEmail'})
  //create table with user model
  User.sync()
    .then(() => console.log('Oh yeah! User table created successfully'))
    .catch(err => console.log('BTW, did you enter wrong database credentials for user?'));
  Parameter.sync()
    .then(() => console.log('Oh yeah! Parameter table created successfully'))
    .catch(err => console.log('BTW, did you enter wrong database credentials for parameter?',err));
  Prescription.sync()
  .then(() => console.log('Oh yeah! Prescription table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for prescription?'));
  Report.sync()
  .then(() => console.log('Oh yeah! Report table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for report?'));
  Doctor.sync()
  .then(() => console.log('Oh yeah! Doctor table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for report?',err));
  Detail.sync()
  .then(() => console.log('Oh yeah! Details table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for details?'));
  Education.sync()
  .then(() => console.log('Oh yeah! education table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for education?',err));
  Hospital.sync()
  .then(() => console.log('Oh yeah! hospital table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for hospital?'))
  Appointment.sync()
  .then(() => console.log('Oh yeah! Appointment table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for hospital?'))
  Comment.sync()
  .then(() => console.log('Oh yeah! Comment table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials for comment?'))
  
app.get('/', function(req, res) {
  res.json({ message: 'Express is up!' });
});

app.post("/single",multerUploads,(req,res)=>{
  console.log(req.file);
  res.send("file upload successful")
})

const createUser = async ({ name, email,password,dob,address,phone,gender }) => { 
  return await User.create({ name, email,password,dob,address,phone,gender });
};
const createDoctor = async ( name, email,password,address,locality,phone,certificate,specialization,start,end,fees,dob,gender ) => { 
  return await Doctor.create({
  name:name,
  email:email,
  password:password,
  address:address,
  locality:locality,
  phone:phone,
  certificate:certificate,
  specialization:specialization,
  start:start,
  end:end,
  fees:fees,
  dob:dob,
  gender:gender
  });
};
const getAllUsers = async () => {
  return await User.findAll();
};
// const getUser = async obj => {
//   return await User.findAll({
//   where: {id : obj},
// });
// };
const getByEmail= async (email,res) => {
  await User.findAll({where:{email:email}}).then(user => {
    console.log('successfully got id')
    return user;
 }).catch(err => res.send({status:0,err:err}));
}
const updateUser = async (email,phone,name,gender,dob,address) => {
  return await User.update(
    { phone:phone,
      name:name,
      gender:gender,
      dob:dob,
      address:address
     },
    { where: {email: email } }
  )
}
app.post("/patient/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword=req.body.confirmPassword;
    const phone=req.body.phoneno;
    const name=req.body.name;
    const gender=req.body.gender;
    const dob=req.body.DOB;
    const city=req.body.city;
    const houseno=req.body.houseNo;
    const state=req.body.state;
    const pin=req.body.pin;
    const country=req.body.country;
    //console.log(email,password,phone,name);
    //making a address object and then converting into a json string.in this way we can store in one column
    const addressObj={
      city : city,
      houseno : houseno,
      state : state,
      pin : pin,
      country : country
    }
    const address=JSON.stringify(addressObj);   //converting in to json string
    if(password!== confirmPassword) res.send({status:0,message : "Passowrds are not matching"})
    bcrypt.hash(password, saltRounds,(err, hash) => {
      if (err) {
        console.log(err);
      }
      console.log("getting values......")
      User.findOne({
        where: {
          email: email
        }
      }).then((result1) => {
        console.log(result1);
        if(result1) {res.send({status:0,message : "sorry the email has been taken"});}
        else
        createUser({ name,email,password,dob,address,phone,gender }).then(user => res.send({status:1,message:'successfuly added'})).catch(err => res.send({status:0,err:err}));
      }).catch(err => {
        res.send({status:0,err : err});
        //console.log(err);
      });
    });
  });

  app.post("/doctor/register",multerUploads, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword=req.body.confirmPassword;
    const phone=req.body.phoneno;
    const name=req.body.name;
    const gender=req.body.gender;
    const dob=req.body.DOB;
    const city=req.body.city;
    const houseno=req.body.houseNo;
    const state=req.body.state;
    const pin=req.body.pin;
    const country=req.body.country;
    const locality=req.body.locality;
    const specialization=req.body.specialization;
    const start=req.body.start;
    const end=req.body.end;
    const fees=req.body.fees;
    const image=req.file.path;
    //console.log(email,password,phone,name);
    //making a address object and then converting into a json string.in this way we can store in one column
    let certificate;
    cloudinary.uploader.upload(image, function(err,recieve){
      if (err) {
        res.send({status:0, message:'certificate could not be up[loaded'})
      }
      certificate=recieve.secure_url;
    })
    const addressObj={
      city : city,
      houseno : houseno,
      state : state,
      pin : pin,
      country : country
    }
    const address=JSON.stringify(addressObj);   //converting in to json string
    if(password!== confirmPassword) res.send({status:0,message : "Passowrds are not matching"})
    bcrypt.hash(password, saltRounds,(err, hash) => {
      if (err) {
        console.log(err);
      }
      console.log("getting values......")
      Doctor.findOne({
        where: {
          email: email
        }
      }).then((result1) => {
        console.log(result1);
        if(result1) {res.send({status:0,message : "sorry the email has been taken"});}
        else
        createDoctor( name, email,password,address,locality,phone,certificate,specialization,start,end,fees,dob,gender ).then(user => res.send({status:1,message:'successfuly added'})).catch(err => res.send({status:0,err:err}));
      }).catch(err => {
        console.log(err)
        res.send({status:0,err : err});
        //console.log(err);
      });
      
      //console.log("getting values......")
      //console.log("getting values......")
      //password=hash;
      // createUser({ name,email,password,dob,address,phone,gender }).then(user => console.log(user)).catch(err => res.send({status:0,err:err}));
      //res.send({status:1,message:'successfuly added'})
    });
  });

  app.get("/patient/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

  app.get("/doctor/login", (req, res) => {
    if (req.session.doctor) {
      res.send({ loggedIn: true, doctor: req.session.doctor });
    } else {
      res.send({ loggedIn: false });
    }
  });

  app.get("/users",(req,res)=>{
    getAllUsers().then(user => res.send(user)).catch(err => res.send(err));
  })
  app.post("/patient/login",async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({
        where: {
          email: email
        }
      })
   // const result=await getByEmail(email,res)
     .then((result) => {
        console.log(result)
        if(result){
            // password.compare(result.get('password'), (error, response) => {
            //     if (response) {
            //       req.session.user = result;
            //       console.log(req.session.user);
            //       res.send(result);
            //     } else {
            //       res.send({ message: "Wrong email/password combination!" });
            //     }
              // });
          if(result.password === password){
            req.session.user = result;
                   console.log(req.session.user);
                  res.send({status: 1,user:result});
          }else{
            res.send({status:0, message: "Wrong email/password combination!" });
          }
        } else{
            res.send({ status:0,message: "no such email exists" });
        }
     })
      .catch(err => {
        res.send({status:0,err : err});
      });
  });

  app.post("/doctor/login",async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Doctor.findOne({
        where: {
          email: email
        }
      })
   // const result=await getByEmail(email,res)
     .then((result) => {
        console.log(result)
        if(result){
            // password.compare(result.get('password'), (error, response) => {
            //     if (response) {
            //       req.session.user = result;
            //       console.log(req.session.user);
            //       res.send(result);
            //     } else {
            //       res.send({ message: "Wrong email/password combination!" });
            //     }
              // });
          if(result.password === password){
            req.session.doctor = result;
                   console.log(req.session.doctor);
                  res.send({status: 1,doctor:result});
          }else{
            res.send({status:0, message: "Wrong email/password combination!" });
          }
        } else{
            res.send({ status:0,message: "no such email exists" });
        }
     })
      .catch(err => {
        console.log(err)
        res.send({status:0,err : err});
      });
  });

  app.get("/patient/profile/:userEmail",(req,res) => {
    const email=req.params.userEmail;

    User.findOne({
        where: {
          email: email
        }
      }).then((result) => {
        if(result){
            profileObj=result;
            console.log(profileObj)
            res.send({status : 1,user:result})
        }
      }).catch(err => {
        res.send({status : 0,err : err});
      });
  })
  //////////////////////////////////////////////////////////////////////////////////
  app.post("/patient/profile/:userEmail",(req,res) => {
    const email=req.params.userEmail;
    const phone=req.body.phone;
    const name=req.body.name;
    const gender=req.body.gender;
    const dob=req.body.dob;
    const city=req.body.city;
    const houseno=req.body.houseno;
    const state=req.body.state;
    const pin=req.body.pin;
    const country=req.body.country;
    //console.log(email,password,phone,name);
    //making a address object and then converting into a json string.in this way we can store in one column
    const addressObj={
      city : city,
      houseno : houseno,
      state : state,
      pin : pin,
      country : country
    }
    const address=JSON.stringify(addressObj);   //converting in to json string
      updateUser(email,phone,name,gender,dob,address)
      .then(user => res.send({status:1,user:user})).catch(err => res.send({status:0,err:err}));
  }
  )
  app.get("/patient/profile/profilePic/:email",(req,res)=>{
    const email = req.params.email

    User.findOne({
      where : {
        email : email
      }
    }).then(result=>{
      res.send({status : 1,pic : result.picture})
    })


  })
  app.get("/patient/doctor/profilePic/:email",(req,res)=>{
    const email = req.params.email

    Doctor.findOne({
      where : {
        email : email
      }
    }).then(result=>{
      res.send({status : 1,pic : result.picture})
    })


  })
  app.get("/patient/parameter/:userEmail", async (req,res) => {
    const email=req.params.userEmail;
    let pid;
    await User.findOne({where:{email:email}}).then(user => {
      pid=user.id;
      console.log('pid is',pid)
   }).catch(err => res.send({status:0,err:err}))//.catch(err => console.log(err));
   await Parameter.findOne({where:{patientId : pid}}).then(user => {
   res.send({status : 1, user:user})
   }).catch(err =>{
     console.log(err)
     res.send({status:0,err:err})
  })
})
  const insertOrCreate = async (height,weight,bp,bloodglucose,pulseoxymetry,diabetis,cholesterol,pid,res) => {
    await Parameter.findOne({where:{patientId : pid}}).then(
       parameter => {
       if(parameter){
         return parameter.update(
          { 
            height:height,
            weight:weight,
            bp:bp,
           bloodglucose:bloodglucose,
            pulseoxymetry:pulseoxymetry,
            diabetis:diabetis,
            cholesterol:cholesterol,
           },
          { where: {patientId: pid } }
        )//.then(user => console.log('user updated',user))
        .then(user => res.send({status:1,message:'user updated',user:user})).catch(err => res.send({status:0,err:err}))
       }
       else{
        const healthObj={
          height:height,
          weight:weight,
          bp:bp,
         bloodglucose:bloodglucose,
          pulseoxymetry:pulseoxymetry,
          diabetis:diabetis,
          cholesterol:cholesterol,
          patientId:pid
        }
        console.log(healthObj)
        return Parameter.create(healthObj).then(user => res.send({status:1,message:'user created',user:user})).catch(err => res.send({status:0,err:err}))
        // return Parameter.create(healthObj).then(user => {
        //   if(user) console.log('user created',user)
        //   else console.log('failed to create user')
        // });
       }
       }
     ).catch(err => res.send({status:0,err:err}));
    
  };
  app.post("/patient/parameter/:userEmail",async (req,res) => {
    const email=req.params.userEmail;
    const height=req.body.height;
    const weight=req.body.weight;
    const bp=req.body.bp;
    const bloodglucose=req.body.bloodglucose;
    const pulseoxymetry=req.body.pulseoxymetry;
    const diabetis=req.body.diabetis;
    const cholesterol=req.body.cholesterol;
    let pid;
   await User.findOne({where:{email:email}}).then(user => {
      console.log('successfully got id')
     pid= user.id;
     console.log(pid)
      insertOrCreate(height,weight,bp,bloodglucose,pulseoxymetry,diabetis,cholesterol,pid,res).then(param => console.log(param)).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  )

  ////////////////////////////////////////////////////////////////
  //Comment Section

  app.post('/post_comment/:patientEmail', async (req, res) => {
    const PatientEmail =req.params.patientEmail
    const DoctorEmail =req.body.doctorEmail
    const comment =req.body.comment

    await Comment.create({PatientEmail, DoctorEmail, comment})
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:err.message || 'some error encountered while creating a comment'
      })
    });
  })

  app.get('/patient/comments/:patientEmail', async (req,res) => {
    const email = req.params.patientEmail
    
    await Comment.findAll({where:{PatientEmail:email}})
    .then(data => {
      res.send({status:1, data:data})
    })
    .catch(err => {
      console.log(err);
      res.send({status:0,err:err})
    })
  })

  //End of Comment Section
  ///////////////////////////////////

 app.get('/patient/health/prescription/:userEmail', async (req,res) => {
   const email=req.params.userEmail
   let pid
  // let pid = getByEmail(email);
    await User.findOne({where:{email:email}}).then(user => {
      pid=user.id;
      console.log('pid is',pid)
   }).catch(err => console.log(err));
  await Prescription.findAll({where:{patientId:pid}}).then(user => res.send({status:1,user:user})).catch(err=> res.send({status:0,err:err}));
 })

 app.post('/patient/health/uploadPrescription/:userEmail',(req,res)=>{
  console.log(req.body) 
  const email = req.params.userEmail
   const url=req.body.url
   const description = req.body.description
   const date = req.body.date 


   User.findOne({where : {email : email}}).then(user=>{
     
    console.log(user.id)
     Prescription.create({
       url : url,
       doctor : description,
       date : date,
       patientId : user.id
     }).then(pres => res.send({status:1,pres:pres})).catch(err => res.send({status:0,err:err}));
    }).catch((error) => {
      res.send({
        status:0,
        err:error,
      });
   }).catch(err=>{
     console.log(err)
   })
 })
 app.get('/patient/health/medicalRecords/:userEmail', async (req,res) => {
  const email=req.params.userEmail
  let pid
 // let pid = getByEmail(email);
   await User.findOne({where:{email:email}}).then(user => {
     pid=user.id;
     console.log('pid is',pid)
  }).catch(err => console.log(err));
 await Report.findAll({where:{patientId:pid}}).then(user => res.send({status:1,user:user})).catch(err=> res.send({status:0,err:err}));
})

app.post('/patient/health/uploadReports/:userEmail',(req,res)=>{
  console.log(req.body) 
  const email = req.params.userEmail
   const url=req.body.url
   const description = req.body.description
   const date = req.body.date 


   User.findOne({where : {email : email}}).then(user=>{
     
    console.log(user.id)
      Report.create({
       url : url,
       doctor : description,
       date : date,
       patientId : user.id
     }).then(pres => res.send({status:1,pres:pres})).catch(err => res.send({status:0,err:err}));
    }).catch((error) => {
      res.send({
        status:0,
        err:error,
      });
   }).catch(err=>{
     console.log(err)
   })
 })


app.post('/patient/profileimage/:userEmail',(req,res) => {
  const email=req.params.userEmail;
  const image=req.body.url;
//   let pid;
//    User.findOne({where:{email:email}}).then(user => {
//     pid=user.id;
//     console.log('pid is',pid)
//  }).catch(err => console.log(err));
   


   User.update(
    { 
    picture:image,
     },
    { where: {email:email } }
  )//.then(user => console.log('user updated',user))
  .then(user => res.send({status:1,message:'profile pic updated',user:user})).catch(err => res.send({status:0,err:err}))


})
app.post('/doctor/profileimage/:userEmail',(req,res) => {
  const email=req.params.userEmail;
  const image=req.body.url;
//   let pid;
//    User.findOne({where:{email:email}}).then(user => {
//     pid=user.id;
//     console.log('pid is',pid)
//  }).catch(err => console.log(err));
   


   Doctor.update(
    { 
    picture:image,
     },
    { where: {email:email } }
  )//.then(user => console.log('user updated',user))
  .then(user => res.send({status:1,message:'profile pic updated',user:user})).catch(err => res.send({status:0,err:err}))


})

//doctor api section

app.get('/doctor/geteducation/:doctorEmail', async (req,res) => {
  let did;
  const email = req.params.doctorEmail
  await  Doctor.findOne({where:{email:email}}).then(doctor => {did=doctor.id;
    console.log('did is',did)})
  await Education.findAll({where:{DoctorId:did}}).then(educations => res.send({status:1,educations:educations}))
  .catch(err => {console.log(err);res.send({status:0,err:err})})
})
app.get('/doctor/gethospital/:doctorEmail', async (req,res) => {
  let did;
  const email=req.params.doctorEmail
  await  Doctor.findOne({where:{email:email}}).then(doctor => {did=doctor.id;
    console.log('did is',did)})
  await Hospital.findAll({where:{DoctorId:did}}).then(hospitals => res.send({status:1,hospitals:hospitals}))
  .catch(err => {console.log(err);res.send({status:0,err:err})})
})

app.get('/doctor/profile/setup/:doctorEmail', async (req,res) =>{
  let did;
  const email=req.params.doctorEmail
  await  Doctor.findOne({where:{email:email}}).then(doctor => {did=doctor.id;
    console.log('did is',did)})
  await Detail.findAll({where:{DoctorId:did}}).then(detail => res.send({status:1,detail:detail}))
  .catch(err => {console.log(err);res.send({status:0,err:err})})
})
app.get('/doctors', async (req, res) => {

  await Doctor.findAll().then(doctors => res.send(doctors))

})

app.get("/doctor/profile/:doctorEmail",(req,res)=>{

  const email = req.params.doctorEmail

  Doctor.findOne({where : {
    email : email
  }}).then(doctor=>{
    res.send({
      status:1,
      doctor : doctor
    })
  })
  .catch(err=>{
    res.send({
      status : 0,
      err : err
    })
  })
})

app.post('/doctor/profile/:doctorEmail', async (req,res) => {
  const email = req.params.doctorEmail;
  const phone=req.body.phone;
  const name=req.body.name;
  const gender=req.body.gender;
  const dob=req.body.dob;
  const city=req.body.city;
  const houseno=req.body.houseno;
  const state=req.body.state;
  const pin=req.body.pin;
  const country=req.body.country;
  const locality=req.body.locality;
  const specialization=req.body.specialization;
  const start=req.body.start;
  const end=req.body.end;
  const fees=req.body.fees;
  const experience=req.body.experience
  const addressObj={
    city : city,
    houseno : houseno,
    state : state,
    pin : pin,
    country : country
  }
  const address=JSON.stringify(addressObj);
      return Doctor.update(
       { 
        phone:phone,
         name:name,
         gender:gender,
         dob:dob,
         address:address,
         locality:locality,
         specialization:specialization,
         start:start,
         end:end,
         fees:fees,
         experience:experience
        },
       { where: {email:email } }
     )//.then(user => console.log('user updated',user))
     .then(doctor => res.send({status:1,message:'basic info updated',doctor:doctor})).catch(err => res.send({status:0,err:err}))
})
 app.post('/doctor/profile/setup/:doctorEmail', async (req,res) => {
  const email = req.params.doctorEmail;
  const starttiming=req.body.starttiming
  const endtiming=req.body.endtiming
  const language1=req.body.language1
  const language2=req.body.language2
  const language3=req.body.language3
  const language4=req.body.language4
  let did;
  await  Doctor.findOne({where:{email:email}}).then(doctor => {did=doctor.id;
    console.log('did is',did)})
    Detail.findOne({where:{DoctorId:did}}).then(
     (detail) => {
      if(detail){
        return detail.update(
         { 
          starttiming:starttiming,
           endtiming:endtiming,
           language1:language1,
           language2:language2,
           language3:language3,
           language4:language4
          },
         { where: {DoctorId:did } }
       )//.then(user => console.log('user updated',user))
       .then(detail => res.send({status:1,message:'details updated',detail:detail})).catch(err => res.send({status:0,err:err}))
      }
      else{
       const detailObj={
        starttiming:starttiming,
        endtiming:endtiming,
        language1:language1,
        language2:language2,
        language3:language3,
        language4:language4,
        DoctorId:did,
       }
       console.log(detailObj)
       return Detail.create(detailObj).then(detail => res.send({status:1,message:'details created',detail:detail})).catch(err => {console.log(err);res.send({status:0,err:err})})
      }
      }
    ).catch(err => {console.log(err);res.send({status:0,err:err})})
  
})
app.post('/doctor/profilepic/:doctorEmail', (req,res) => {

})
app.post('/doctor/addhospital/:doctorEmail', async (req,res) => {
  const email = req.params.doctorEmail;
  const hospital=req.body.hospital;
  const start=req.body.start;
  const end=req.body.end;
  const field=req.body.field;
  let did;
  await  Doctor.findOne({where:{email:email}}).then(doctor => {did=doctor.id;
    console.log('did is',did)})
  await Hospital.create({DoctorId:did,name:hospital,start:start,end:end,field:field}).then(hospital => res.send({status:1,hospital:hospital}))
  .catch(err => {console.log(err);res.send({status:0,err:err})})
})
app.post('/doctor/addeducation/:doctorEmail', async (req,res) => {
  const email = req.params.doctorEmail;
  const institute=req.body.institute;
  const start=req.body.start;
  const end=req.body.end;
  const field=req.body.field;
  let did;
  await  Doctor.findOne({where:{email:email}}).then(doctor => {did=doctor.id;
    console.log('did is',did)})
  await Education.create({DoctorId:did,institute:institute,start:start,end:end,field:field}).then(education => res.send({status:1,education:education}))
  .catch(err => {console.log(err);res.send({status:0,err:err})})
})
 
//  axios.get("/doctor/education/:email",(req,res)=>{
//     const email = req.params.email
//     Doctor.findOne({
//       where : {
//         email : email
//       }
//     }).then(user=>{
      
//     })
//  })
 app.get('/debug/:userEmail',async (req,res) => {
  email= req.params.userEmail;
  User.findAll({
   where:{email:email},
   include: [{
     model: Parameter,
     //as:'parameter',
     required: true
    }]
 }).then(user => {
   console.log(user[0].Parameter)
   res.send({user:user})
 }).catch(err => res.send({err:err}));
})

app.get('/getAllDoctors', async (req, res) => {
  await Doctor.findAll()
  .then(result => {
    res.send({status:1, result:result})
  }).catch(err => res.send({err:err}));
})
app.get('/selectData', async (req,res) => {
  await Doctor.findAll(
    {
      attributes:[
        'experience', 'specialization', 'locality', 'fees', 'language1', 'language2', 'language3', 'language4'
    ]
  })
  .then(data =>{
    res.send({status:1, data : data})
  })
  .catch(err =>{console.log(err); res.send({err:err})});
})
app.post('/searchdoctors',(req,res) => {
  console.log(req.body)
  specialization=req.body.specialization
  language=req.body.language
  locality=req.body.locality
  experience=req.body.experience
  high=req.body.high
  low=req.body.low
  var highFee=parseInt(high)
  var lowFee=parseInt(low)
  Doctor.findAll({
  where:{
  experience:experience,
  locality:locality,
  specialization:specialization,
  fees: {
    [Sequelize.Op.between]: [lowFee, highFee]
  },
  [Sequelize.Op.or] : {
    language1: language,
    language2: language,
    language3: language,
    language4: language,}
  },
  }).then(doctors => {
   console.log(doctors)
   res.send({doctors:doctors})
 }).catch(err =>{console.log(err); res.send({err:err})});
})


const getDoctorInfo = async (did) => {
  return await Doctor.findOne(
    { where: {id: did } }
  )
}

const getResponse = (appointments,res) => {
  var newAppointments=[]
  appointments.map(async appointment => {
    did=appointment.DoctorId;
    console.log(did)
    try{
      const doctor= await getDoctorInfo(did);
      const newAppointment={
        language:appointment.language,
        status : appointment.status,
        name:doctor.name,
        specialization:doctor.specialization,
        fees:doctor.fees,
        doctorEmail : doctor.email,
        experience:doctor.experience,
        address:doctor.address,
        starttiming:doctor.starttiming,
        endtiming:doctor.endtiming,
        picture:doctor.picture
      }
      console.log(newAppointment)
      newAppointments.push(newAppointment)
    }
    catch(err){
      res.send({status:0,err:err})
    }
  })
  //res.send({status:1,appointments:newAppointments})
  setTimeout(() => {
    if(newAppointments.length)
    res.send({status:1,appointments:newAppointments})
  },50)
}

app.get('/patient/appointments/:patientEmail',async (req,res) => {
  const patientEmail=req.params.patientEmail
  // const status = req.body.status
  let pid,did;
await  User.findOne({where:{email: patientEmail}}).then(patient => {
  pid=patient.id
  console.log(patient.id)})
  await Appointment.findAll(
    {
      where : {
        patientId:pid,
        status: 
        {
          [Sequelize.Op.in]:['pending','approved','confirmed']
        }
        },
  }).then(appointments => { console.log(appointments);getResponse(appointments,res)}).catch(err => res.send({status:0,err:err}))
})


const getUser = async obj => {

  return await User.findOne({

  where: obj,

});

};

const getResponseDoctor = (appointments,res) => {

  var newAppointments=[]
  let pid

  appointments.map(async appointment => {

    pid=appointment.patientId

    console.log(pid)

    try{

    const patient=await getUser({id : pid});

    const newAppointment={

      id : appointment.id,

      language:appointment.language,

      status : appointment.status,

      name:patient.name,

      email:patient.email,

      phone:patient.phoneno,

      address:patient.address,

      picture:patient.picture,

      dob:patient.dob,

      gender:patient.gender

    }

    console.log(newAppointment)

        newAppointments.push(newAppointment)

    }

    catch(err){

      res.send({status:0,err:err})

    }

  })

  setTimeout(() => {

    if(newAppointments.length)

    res.send({status:1,appointments:newAppointments})

  },50)

}



app.get('/doctor/appointments/:doctorEmail', async (req,res) => {

  const doctorEmail=req.params.doctorEmail

  let pid,did;

  await  Doctor.findOne({where:{email: doctorEmail}}).then(doctor => {did=doctor.id;

    console.log('did is',did)})

    await Appointment.findAll(

      {

        where : {

          DoctorId:did,

          status:{

            [Sequelize.Op.in]:['pending','approved','confirmed']

          }

          },

    }).then(appointments => { console.log(appointments);getResponseDoctor(appointments,res)}).catch(err => res.send({status:0,err:err}))

})
app.get('/patient/history/:patientEmail', async (req,res) => {
  let pid;
  
  const patientEmail = req.params.patientEmail


  
  await  User.findOne({where:{email: patientEmail}}).then(patient => {pid=patient.id;
    console.log('pid is',pid)})

    try{
      let historyAppointments=[]
      await Appointment.findAll({where : {patientId : pid}}).then(async appointments => {
        //console.log(appointments[0])
      appointments.map( async appointment => {
        did=appointment.DoctorId;
        console.log(did)
        try{
          var doctor=await getDoctorInfo(did)
          //console.log(doctor)
          //Object.assign(newAppointment,{specialization:doctor.specialization})
          const historyAppointment={
            language:appointment.language,
            status : appointment.status,
            name:doctor.name,
            specialization:doctor.specialization,
            fees:doctor.fees,
            experience:doctor.experience,
            address:doctor.address,
            starttiming:doctor.starttiming,
            endtiming:doctor.endtiming,
            picture:doctor.picture,
            date:doctor.createdAt
          }
          //console.log(newAppointment)
          historyAppointments.push(historyAppointment)
          //console.log(newAppointments)
        }catch(err){
           console.log('not syncing',err)
        }
      })
      })
      console.log(historyAppointments)
      setTimeout(()=>{
      if(historyAppointments.length) res.send({status:1,pastappointments:historyAppointments})
      },1000) 
    }
    catch(err){
      console.log(err)
      res.send({status:0,err:err})
    }

})

// app.post('/bookappointment', async (req, res) => {
//   const 
//   await 
// })
app.post('/bookappointment/:patientEmail/:doctorEmail', async (req,res) => {
  const patientEmail=req.params.patientEmail;
  const doctorEmail=req.params.doctorEmail;
  
  const language=req.body.language;
  const status='pending';
  let pid,did;
  await  User.findOne({where:{email: patientEmail}}).then(patient => {pid=patient.id;
    console.log('pid is',pid)})
  await  Doctor.findOne({where:{email:doctorEmail}}).then(doctor => {did=doctor.id
    console.log('did,fees are',did)})

  //res.send('help')
  // await Appointment.findOne({where : {doctorId : did ,patientId:pid}}).then(appointment =>{
  //   if(appointment) res.send({status:0,message:'u have an exsisting appointment'})
  // }).catch(err => res.send({status:0,err:err}))
  await Appointment.create({DoctorId:did,patientId:pid,status:status,language:language}).then(appointment => {
    // req.io.emit('appointment',doctorEmail,appointment)
    res.send({status:1,message:'appointment created',appointment:appointment})
  }).catch(err => res.send({status:0,err:err}))
})

app.get("/:user/:email",async (req,res)=>{
  const user = req.params.user
  const email = req.params.email

  if(user=="patient")
  {
      await User.findOne({where : {email : email}}).then(result=>{
          res.send(result)
      })  
  }
  else
  {
    await Doctor.findOne({where : {email : email}}).then(result=>{
      res.send(result)
  })  
  }
})

const server = http.createServer(app)

const io=SocketIo(server,{
  cors :{
    origin : ["http://localhost:3000"]
  }
})



io.on('connection', socket => {
  socket.on('join', (data) => {
    socket.join(data.email)
    console.log('server-socket-email:', data.email)
    io.sockets.in(data.email).emit('new_msg', {msg: 'hello'});

  })
//   console.log('client connected');
//   socket.on('appointment-create',room => {
//     console.log("room is "+room)
//     try{
//       console.log('join room',room)
//       socket.join(room)
//       io.to(room).emit('patient joined room')
//       io.emit("appointment-created","appoint-created")
//     }catch(e){
//       console.log('error in joining room')
//       io.emit('error','could not perform')
//     }
//   })
//   socket.on('approve-appointment',room => {
//     try{
//       console.log('join room',room)
//       socket.join(room)
//       io.to(room).emit('doctor joined room')
//     }catch(e){
//       console.log('error in joining room')
//       io.emit('error','could not perform')
//     }
//   })

//   socket.on("book appointment",async (pEmail,dEmail)=>{
//     let pid,did
//     await  User.findOne({where:{email: pEmail}}).then(patient => {pid=patient.id;
//       console.log('pid is',pid)})
//     await  Doctor.findOne({where:{email:dEmail}}).then(doctor => {did=doctor.id
//       console.log('did,fees are',did)})
//     await Appointment.create({DoctorId:did,patientId:pid,status:"pending",language:"hindi"}).then(appointment => {
//       io.emit('appointment',dEmail,appointment)
//       // res.send({status:1,message:'appointment created',appointment:appointment})
//     }).catch(err => console.log(err))
//   }
//   )

// socket.on('approve',(id)=>{
//       // Appointment.update({where : {id : id}},{
//       //   status : "approved"
//       // }).then(res=>{
//       //   console.log(res)
//         // socket.join(id)
//         io.emit("appointment-approved","message approved")
//       // })
  // })
})

app.use((req,res,next) => {
  req.io=io;
  next();
})


app.post('/doctor/approve/appointment/:id' ,async (req,res) => {
  // await Appointment.findOne({where: {id:req.params.id}}).then(appointment => {
    // console.log(appointment)
    Appointment.update({status:'approved'},{where:{id:req.params.id}}).then(result => {
    ///need to join the room
  
    res.send({status:1,message:'appointment approved'})}
    )
  .catch(err => res.send({status:0,err:err}))
  })



  server.listen(3001, () => {
    console.log("running server");
  })