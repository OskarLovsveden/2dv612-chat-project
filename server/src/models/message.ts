
import { DataTypes, Optional, Model } from 'sequelize';
import sequelize from '../db/postgres';

type MessageAttributes = {
    id: number;
    name: string;
    message: string;
    user_id: number;
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

    // public readonly createdAt!: Date;
    // public readonly updatedAt!: Date;
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
        }
    },
    {
        tableName: 'message',
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);

export default Message;