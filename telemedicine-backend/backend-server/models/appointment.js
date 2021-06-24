module.exports= function(sequelize, DataTypes) {
    return sequelize.define('Appointment',{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
      // doctorId: {
      //       allowNull:false,
      //       type: DataTypes.INTEGER,
      //       references: {
      //         references:'doctors',
      //         referencesKey:'id',
      //         //onDelete:'cascade'
      //       }
      //     },
     patientId: {
        allowNull:false,
            type: DataTypes.INTEGER,
            references: {
              references:'users',
              referencesKey:'id',
              //onDelete:'cascade'
            }
     },
      status: {
         type: DataTypes.STRING,
      },
      queueno: {
        type: DataTypes.INTEGER,
      },
      language: {
        type: DataTypes.STRING  
      },
    });
  }