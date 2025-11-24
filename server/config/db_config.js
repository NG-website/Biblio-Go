import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(
  process.env.NAME_DB,
  process.env.NAME_USER,
  process.env.PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    dialect: process.env.DIALECT_DB
  }
)
// try {
//   await sequelize.authenticate();
//   console.log('Connection db ok');
// } catch (error) {
//   console.error('Erreur connection db', error);
// }
export default sequelize