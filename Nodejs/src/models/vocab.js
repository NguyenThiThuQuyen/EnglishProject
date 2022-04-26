'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vocab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Vocab.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            targetKey: 'id',
            as: 'lessonData1'
        })
    }
    };
    Vocab.init({
        vocab: DataTypes.STRING,
        lessonId: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'Vocab',
  });
  return Vocab;
};