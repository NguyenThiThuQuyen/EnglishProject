'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WordMeaning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        WordMeaning.belongsTo(models.Vocab, {
            foreignKey: 'wordMeaningId',
            targetKey: 'id',
            as: 'wordMeaningData'
        })
    }
    };
    WordMeaning.init({
        WordMeaning: DataTypes.STRING,
        vocabId: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'WordMeaning',
  });
  return WordMeaning;
};