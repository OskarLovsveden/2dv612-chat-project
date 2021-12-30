import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/postgres';

type ChatroomAttributes = {
  id: number;
  name: string;
  is_public: boolean;
  tag: string[];
  user_ids: Array<number>;
};

class Chatroom
    extends Model<ChatroomAttributes, ChatroomCreationAttributes>
    implements ChatroomAttributes
{
    is_public: boolean;
    id!: number;
    name: string;
    tag: string[];
    user_ids: number[];
}

export type ChatroomCreationAttributes = Optional<ChatroomAttributes, 'id'>;

Chatroom.init(
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
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        tag: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        user_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    },
    {
        tableName: 'chatroom',
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);

export default Chatroom;
