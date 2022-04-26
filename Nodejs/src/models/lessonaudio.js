'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonAudio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        LessonAudio.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            targetKey: 'id',
            as: 'lessonData2'
        })
    }
    };
    LessonAudio.init({
        lessonAudio: DataTypes.STRING,
        lessonId: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'LessonAudio',
  });
  return LessonAudio;
};