import { DataTypes } from "sequelize";
import sequelize from "../config/db_config.js";
import userModel from "./userModel.js";
import bookModel from "./bookModel.js";

const bookUserModel = sequelize.define("Book_User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  take_at: DataTypes.DATE,
  deposit_at: DataTypes.DATE,
  take:{
    type :DataTypes.BOOLEAN,
    defaultValue:false},
  deposit:{
    type :DataTypes.BOOLEAN,
    defaultValue:false},
  
     updateDeposit:{
       type:DataTypes.BOOLEAN,
       defaultValue:false
     },
  
})

// 🔹 Associations pour accéder aux relations directement depuis la table pivot
bookUserModel.belongsTo(userModel, { foreignKey: "userId" });
bookUserModel.belongsTo(bookModel, { foreignKey: "bookId" });

export default bookUserModel;
