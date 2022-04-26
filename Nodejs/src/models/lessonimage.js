'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        LessonImage.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            targetKey: 'id',
            as: 'lessonData4'
        })
    }
    };
    LessonImage.init({
        lessonImage: DataTypes.STRING,
        lessonId: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'LessonImage',
  });
  return LessonImage;
};