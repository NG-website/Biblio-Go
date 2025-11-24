import { DataTypes } from "sequelize";
import sequelize from "../config/db_config.js";

const authorModel=sequelize.define('Author',{
    firstname:{
        type:DataTypes.STRING,
       
    },
    lastname:{
       type: DataTypes.STRING,
        unique:true
    },
    description:DataTypes.STRING
},{
      tableName: "authors",
})

export default authorModel