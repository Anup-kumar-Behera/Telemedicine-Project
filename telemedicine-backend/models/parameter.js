
module.exports= function(sequelize, DataTypes) {
  return sequelize.define('Parameter', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.STRING
    },
    bp: {
      type: DataTypes.STRING
    },
    bloodglucose: {
      type: DataTypes.STRING
    },
    pulseoxymetry: {
      type: DataTypes.STRING
    },
    diabetis: {
      type: DataTypes.STRING
    },
    cholesterol: {
      type: DataTypes.STRING
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