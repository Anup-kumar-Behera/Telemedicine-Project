
module.exports= function(sequelize, DataTypes) {
  return sequelize.define('User', {
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
        unique:true
      },
      password: {
        type: DataTypes.STRING
      },
      dob: {
        type: DataTypes.DATE
      },
      address: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      picture: {
        type: DataTypes.STRING
      }
  });
}
