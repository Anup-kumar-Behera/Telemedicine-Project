module.exports= function(sequelize, DataTypes) {
    return sequelize.define('Comment', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
            },
        PatientEmail:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        DoctorEmail:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING
        }
        ,
        commentedAt: {
            type: DataTypes.TIME
        },
    });
  }
  