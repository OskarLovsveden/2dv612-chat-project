import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/postgres';

type DirectMessageAttributes = {
    id: number;
    user_ids: Array<number>;
};

class DirectMessage
    extends Model<DirectMessageAttributes, DirectMessageCreationAttributes>
    implements DirectMessageAttributes
{
    is_public: boolean;
    id!: number;
    name: string;
    public: boolean;
    tag: string[];
    user_ids: number[];
}

export type DirectMessageCreationAttributes = Optional<DirectMessageAttributes, 'id'>;

DirectMessage.init(
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
        tableName: 'direct-message',
        createdAt: false,
        updatedAt: false,
        sequelize
    }
);

export default DirectMessage;
