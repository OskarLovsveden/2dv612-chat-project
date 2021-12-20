import dbConfig from '../../db/postgres';

const Room = dbConfig.define('Chatroom', {
    'name': 'room1',
    'public': true,
    'tag': 'linux',
    'user_ids': [1, 2, 3]
}, {
    tableName: 'chatroom',
    timestamps: false,
    createdAt: false,
    updatedAt: false
});

export default Room;