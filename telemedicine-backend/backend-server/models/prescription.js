
module.exports= function(sequelize, DataTypes) {
  return sequelize.define('Prescription', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    url: {
      type: DataTypes.STRING,
      allowNull:false
    },
    doctor: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATEONLY
    },
    patientId: {
      allowNull:false,
      type: DataTypes.INTEGER,
      references: {
        references:'users',
        referencesKey:'id'
      }
    },
  });
}