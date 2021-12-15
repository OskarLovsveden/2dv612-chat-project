import { DataTypes } from 'sequelize';
import { dbConfig } from '../../db/postgres';

const Chatroom = dbConfig.define('Chatroom', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    public: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'chatroom',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

export default Chatroom;