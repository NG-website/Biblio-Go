import { DataTypes } from 'sequelize'
import sequelize from '../config/db_config.js'
import userModel from './userModel.js';
import bookModel from './bookModel.js';

const LikeModel = sequelize.define('Like',{
    userId : DataTypes.INTEGER,
    bookId : DataTypes.INTEGER
})
LikeModel.belongsTo(userModel, { foreignKey: "userId" });
LikeModel.belongsTo(bookModel, { foreignKey: "bookId" });

export default LikeModel 