// // import ChatRoomService from '../../services/chatroom-service';
// // import Chatroom from '../../models/chatroom';
// import SequelizeMock from 'sequelize-mock';

// const sequelize = new SequelizeMock();

// // const test = {
// //     name: 'test',
// //     public: true,
// //     tag: ['hej', 'test'],
// //     user_ids: [1, 2]
// // };

// // const Room = new ChatRoomService().create(chatroom);

// const Room = sequelize.define(
//     'Chatroom',
//     {
//         name: 'room1',
//         public: true,
//         tag: ['nature', 'adventure'],
//         user_ids: [1, 2, 3]
//     },
//     {
//         tableName: 'chatroom',
//         timestamps: false,
//         createdAt: false,
//         updatedAt: false
//     }
// );

// export default Room;
