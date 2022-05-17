'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Question.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            targetKey: 'id',
            as: 'lessonDataFromQuestion'
        })

        Question.hasMany(models.answers, { //anwsers  //Question
          foreignKey: 'questionId', 
          as: 'anwserData'
      })
    }
    };
    Question.init({
        question: DataTypes.STRING,
        answerTrue: DataTypes.STRING,
        answerFalse1: DataTypes.STRING,
        answerFalse2: DataTypes.STRING,
        answerFalse3: DataTypes.STRING,
        lessonId: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};