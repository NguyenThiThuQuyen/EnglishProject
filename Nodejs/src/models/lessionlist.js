'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LessionList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LessionList.belongsTo(models.Topic, {
        foreignKey: 'lessionListId',
        as: 'lessionListData'})
    }
  };
  LessionList.init({
    name: DataTypes.STRING,
    topicId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'LessionList',
  });
  return LessionList;
};