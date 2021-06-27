module.exports = function(sequelize, DataTypes) {
    return sequelize.define('VerificationToken1', {
        patientId: {
            allowNull:false,
                type: DataTypes.INTEGER,
                references: {
                  references:'users',
                  referencesKey:'id',
                  //onDelete:'cascade'
                }
         },
            token: DataTypes.STRING
        });
    };