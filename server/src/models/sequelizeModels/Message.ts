import { DataTypes } from 'sequelize';
import { dbConfig } from '../../db/postgres';

const Message = dbConfig.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    room_id: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'message',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

export default Message;