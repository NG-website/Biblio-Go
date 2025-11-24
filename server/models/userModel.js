import { DataTypes } from 'sequelize'
import sequelize from '../config/db_config.js'
import { toDefaultValue } from 'sequelize/lib/utils'

const userModel = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  address: DataTypes.STRING,
  postalCode: DataTypes.STRING,
  country:DataTypes.STRING,
  phone: DataTypes.STRING,
  role: DataTypes.BOOLEAN,
  abonement: DataTypes.DATE,
  abonementType : DataTypes.STRING,
  actif : DataTypes.BOOLEAN,
  tokenValidation : DataTypes.STRING,
  durationValidation: DataTypes.DATE,
  tokenAdmin: DataTypes.STRING
})
export default userModel