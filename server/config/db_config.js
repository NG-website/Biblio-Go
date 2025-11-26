import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.NAME_USER,
  process.env.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    port: process.env.PORT,     //  <-- IMPORTANT
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
)

try {
  await sequelize.authenticate();
  console.log('Connection db ok');
} catch (error) {
  console.error('Erreur connection db', error);
}
export default sequelize