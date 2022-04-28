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
            foreignKey: 'vocabId',
            targetKey: 'id',
            as: 'vocabData'
        })

        Vocab.hasMany(models.WordMeaning, {
          foreignKey: 'wordMeaningId', 
          as: 'wordMeaningData'
        })

        Vocab.hasMany(models.VocabType, {
          foreignKey: 'vocabTypeId', 
          as: 'vocabTypeData'
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