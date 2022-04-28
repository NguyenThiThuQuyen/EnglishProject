'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessonLessonList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        LessonLessonList.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            targetKey: 'id',
            as: 'lessonData'
        })

        LessonLessonList.belongsTo(models.LessonList, {
            foreignKey: 'lessonListId',
            targetKey: 'id',
            as: 'lessonListData'
        })
    }
  };
  LessonLessonList.init({
    lessonId: DataTypes.STRING,
    lessonListId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LessonLessonList',
  });
  return LessonLessonList;
};