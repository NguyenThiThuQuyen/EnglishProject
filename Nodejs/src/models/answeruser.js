'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  AnswerUser.init({
    answerUser: DataTypes.STRING,
    userId: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'AnswerUser',
  });
  return AnswerUser;
};