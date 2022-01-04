import { Association, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, Model, Optional } from 'sequelize';
import sequelize from '../db/postgres';
import Message from './message';

type ConversationAttributes = {
    id: number;
    user_ids: number[];
};

class Conversation
    extends Model<ConversationAttributes, ConversationCreationAttributes>
    implements ConversationAttributes
{
    id!: number;
    user_ids: number[];

    public getMessages!: HasManyGetAssociationsMixin<Message>;
    public addMessage!: HasManyAddAssociationMixin<Message, number>;
    public createMessage!: HasManyCreateAssociationMixin<Message>;

    public readonly messages?: Message[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        messages: Association<Conversation, Message>;
    };
}

export type ConversationCreationAttributes = Optional<ConversationAttributes, 'id'>;

Conversation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_ids: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        }
    },
    {
        tableName: 'conversation',
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
Conversation.hasMany(Message, {
    sourceKey: 'id', // Conversation.id
    foreignKey: 'id', // Message.id
    as: 'messages' // this determines the name in `associations`!
});

// Conversation(..) ---> Association(Conversation.id, Message.id) <--- Message(..)

export default Conversation;
