'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VocabType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        VocabType.belongsTo(models.Vocab, {
            foreignKey: 'vocabId',
            targetKey: 'id',
            as: 'vocabData1'
        })
    }
    };
    VocabType.init({
        vocabType: DataTypes.STRING,
        vocabId: DataTypes.STRING,
    }, {
    sequelize,
    modelName: 'VocabType',
  });
  return VocabType;
};