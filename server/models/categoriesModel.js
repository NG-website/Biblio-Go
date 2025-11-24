import { DataTypes } from 'sequelize'
import sequelize from '../config/db_config.js'

const categoriesModel = sequelize.define('Categories',{
    name : DataTypes.STRING
})


export default categoriesModel 