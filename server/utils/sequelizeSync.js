import sequelize from "../config/db_config.js";

const syncDB = async() => {
  try {
    await sequelize.sync({ alter: true });
    console.log('DataBase synchronisée');
  } catch (err) {
    console.error('Erreur de synchronisation DataBase :', err);
  }
}
export default syncDB