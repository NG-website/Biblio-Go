import { DataTypes, STRING } from 'sequelize';
import sequelize from '../config/db_config.js';

const bookModel = sequelize.define('Book', {
    name: DataTypes.STRING,
    stock: DataTypes.BIGINT,
    note : DataTypes.FLOAT,
    description: DataTypes.TEXT('long') ,
     borrow : {
       type: DataTypes.BIGINT,
        defaultValue:0
     }
    
},{  tableName: "books"})
 
export default bookModel