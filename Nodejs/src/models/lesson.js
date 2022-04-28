'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Lesson.hasMany(models.LessonLessonList, {
        foreignKey: 'lessonId', 
        as: 'lessonData'
    })
    
    Lesson.hasMany(models.Vocab, {
        foreignKey: 'vocabId', 
        as: 'vocabData'
    })

    Lesson.hasMany(models.LessonAudio, {
        foreignKey: 'lessonId', 
        as: 'lessonData2'
    })

    Lesson.hasMany(models.LessonVideo, {
        foreignKey: 'lessonId', 
        as: 'lessonData3'
    })

    Lesson.hasMany(models.LessonImage, {
        foreignKey: 'lessonId', 
        as: 'lessonData4'
    })

    Lesson.hasMany(models.Question, {
      foreignKey: 'lessonId', 
      as: 'lessonData5'
  })

    
    }
  };
  Lesson.init({
    lessonName: DataTypes.STRING,
    lessonImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};