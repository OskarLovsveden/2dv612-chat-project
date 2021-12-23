import SequelizeMock from 'sequelize-mock';

const sequelizeMock = new SequelizeMock();

const mockChatroom = sequelizeMock.define(
    'Chatroom',
    {
        name: 'room1',
        is_public: true,
        tag: ['nature', 'adventure'],
        user_ids: [1, 2, 3]
    },
    {
        tableName: 'chatroom',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

export default mockChatroom;
