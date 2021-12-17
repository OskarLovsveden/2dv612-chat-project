import { DataTypes } from 'sequelize';
import dbConfig from '../../db/postgres';

let Chatroom;

if (process.env.NODE_ENV === 'test') {
    Chatroom = dbConfig.define('Chatroom', {
        'name': 'room1',
        'public': true,
        'tag': 'linux',
        'user_ids': [1, 2, 3]
    });
} else {
    Chatroom = dbConfig.define('Chatroom', {
        id: {
            type: DataTypes.INTEGER,
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
        },
        user_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    }, {
        tableName: 'chatroom',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
}

export default Chatroom;