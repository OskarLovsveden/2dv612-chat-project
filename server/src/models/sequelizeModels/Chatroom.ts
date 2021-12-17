import { DataTypes } from 'sequelize';
import { dbConfig } from '../../db/postgres';

import { Model, Optional } from 'sequelize';


type ChatroomAttributes ={
  id: number;
  name: string;
  public: boolean;
  tag: string;
  user_ids: number[]; 
}


type ChatroomCreationAttributes = Optional<ChatroomAttributes, 'id'>

type ChatroomInstance = {
      createdAt?: Date;
      updatedAt?: Date;
    } & Model<ChatroomAttributes, ChatroomCreationAttributes> & ChatroomAttributes

const Chatroom = dbConfig.define<ChatroomInstance>('Chatroom', {
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



export default Chatroom;