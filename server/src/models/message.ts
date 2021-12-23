
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../db/postgres';

type MessageAttributes = {
    id: number;
    name: string;
    message: string;
    user_id: number;
    room_id: number
}

export type MessageCreationAttributes = Optional<MessageAttributes, 'id'>;
class Message 
    extends Model<MessageAttributes, MessageCreationAttributes>
    implements MessageAttributes
{
    id!: number;
    name: string;
    message: string;
    user_id: number;
    room_id: number;
}


Message.init(
    {
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
    },
    {
        tableName: 'message',
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);

// const Message = dbConfig.define('Message', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     message: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     room_id: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     tableName: 'message',
//     timestamps: false,
//     createdAt: false,
//     updatedAt: false
// });

export default Message;