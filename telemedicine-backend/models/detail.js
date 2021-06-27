module.exports= function(sequelize, DataTypes) {
    return sequelize.define('Detail', {
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
      //         onDelete: 'cascade'
      //       }
      //     },
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
  