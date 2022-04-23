'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LessonList.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        targetKey: 'id',
        as: 'topicData'})
    }
  };
  LessonList.init({
    name: DataTypes.STRING,
    topicId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LessonList',
  });
  return LessonList;
};