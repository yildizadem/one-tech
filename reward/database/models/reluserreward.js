'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelUserReward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  RelUserReward.init({
    user: DataTypes.INTEGER,
    reward: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RelUserReward',
    timestamps: false
  });
  return RelUserReward;
};