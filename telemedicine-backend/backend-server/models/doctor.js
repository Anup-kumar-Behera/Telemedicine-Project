module.exports= function(sequelize, DataTypes) {
    return sequelize.define('Doctor', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING,
          allowNull:false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING
        },
        address: {
          type: DataTypes.STRING
        },
        locality: {
            type: DataTypes.STRING
        },
        phone: {
          type: DataTypes.STRING
        },
        certificate: {
            type: DataTypes.STRING
        },
        specialization: {
            type: DataTypes.STRING 
        },
        start: {
            type: DataTypes.DATE
        },
        end: {
            type: DataTypes.DATE
        },
        fees: {
            type: DataTypes.INTEGER
        },
        dob: {
          type: DataTypes.DATE
        },
        gender: {
          type: DataTypes.STRING
        },
        experience: {
          type: DataTypes.INTEGER,
        },
        active: {
          type: DataTypes.BOOLEAN,
          default:true
        },
        picture: {
          type: DataTypes.STRING  
        },
        starttiming: {
          type: DataTypes.TIME
        },
        endtiming: {
          type: DataTypes.TIME
        },
        language1: {
           type: DataTypes.STRING,
        },
        language2: {
          type: DataTypes.STRING,
       },
       language3: {
          type: DataTypes.STRING,
       },
       language4: {
          type: DataTypes.STRING,
       },
    });
  }
  