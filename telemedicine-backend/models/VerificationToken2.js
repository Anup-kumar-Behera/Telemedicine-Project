module.exports = function(sequelize, DataTypes) {
    return sequelize.define('VerificationToken2', {
        docId: {
            allowNull:false,
                type: DataTypes.INTEGER,
                references: {
                  references:'doctors',
                  referencesKey:'id',
                  //onDelete:'cascade'
                }
         },
            token: DataTypes.STRING
        });
    };