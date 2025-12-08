import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.NAME_USER,
  process.env.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    port: process.env.PORT,     
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)
export default sequelize
