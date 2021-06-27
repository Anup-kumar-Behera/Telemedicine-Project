module.exports= function(sequelize, DataTypes) {
    return sequelize.define('Hospital',{
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
    //   doctorId: {
    //         allowNull:false,
    //         type: DataTypes.INTEGER,
    //         references: {
    //           references:'doctors',
    //           referencesKey:'id',
    //           //onDelete:'cascade'
    //         }
    //       },
      name: {
         type: DataTypes.STRING,
      },
      start: {
        type: DataTypes.STRING,
      },
      end: {
        type: DataTypes.STRING,
      },
      field: {
        type: DataTypes.STRING  
      },
    });
  }
  