import { DataTypes } from 'sequelize';
import userModel from './userModel';


const apiModel = sequelize.define(
    'API',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'API',
        timestamps: false
    }
);

apiModel.belongsTo(userModel, { foreignKey: 'userId' })

export default apiModel


