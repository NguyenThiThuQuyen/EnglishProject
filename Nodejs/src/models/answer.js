'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      answers.belongsTo(models.Question, {
        foreignKey: 'questionId',
        targetKey: 'id',
        as: 'anwserData'
    })

    // answers.belongsTo(models.AnswerUser, {
    //     foreignKey: 'answerUserId',
    //     targetKey: 'id',
    //     as: 'answerUserData'
    // })
  }
};
    answers.init({
        answer: DataTypes.STRING,
        questionId: DataTypes.STRING,
        status: DataTypes.STRING,
    
    }, {
    sequelize,
    modelName: 'answers',
  });
  return answers;
};