module.exports = (sequelize, DataTypes) => {
    const Recommendation = sequelize.define('Recommendation', {
       id: {
           type: DataTypes.INTEGER,
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
       },
       title: {
           type: DataTypes.STRING,
           allowNull: false,
       },
       description: {
           type: DataTypes.STRING,
           allowNull: true,
       },
       url_video: {
           type: DataTypes.STRING,
           allowNull: true,
       },

       url_image: {
        type: DataTypes.STRING,
        allowNull: true,
        },
        
       createdAt: {
           type: DataTypes.DATE,
           allowNull: false,
           defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
       },
       updatedAt: {
           type: DataTypes.DATE,
           allowNull: false,
           defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
       }
    }, {
       tableName: 'recommendations',
    });
   
    return Recommendation;
   };
   