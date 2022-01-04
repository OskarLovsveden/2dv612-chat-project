import { Association, DataTypes, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, Model, Optional } from 'sequelize';
import sequelize from '../db/postgres';
import Message from './message';

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
    public: boolean;
    tag: string[];
    user_ids: number[];

    // public getMessages!: HasManyGetAssociationsMixin<Message>;
    // public addMessage!: HasManyAddAssociationMixin<Message, number>;
    // public createMessage!: HasManyCreateAssociationMixin<Message>;

    // public readonly messages?: Message[];

    // public static associations: {
    //     messages: Association<Chatroom, Message>;
    // };
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

// Chatroom.hasMany(Message, {
//     sourceKey: 'id',
//     foreignKey: 'id',
//     as: 'messages'
// });

export default Chatroom;
