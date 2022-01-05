import Chatroom from '../models/chatroom';
import Conversation from '../models/conversation';
import Message from '../models/message';
import User from '../models/user';
import UserService from '../services/user-service';

const isDev = process.env.NODE_ENV === 'development';

export const dbInit = async () => {
    await Chatroom.sync({ alter: isDev });
    await Conversation.sync({ alter: isDev });
    await Message.sync({ alter: isDev });
    await User.sync({ alter: isDev });
    
    /* const user = User.findOrCreate({ where: { username: 'admin' } }, ); */

    const userService = new UserService();
    const admin = await User.findOne({ where: { username: 'admin' } });
    const user = await User.findOne({ where: { username: 'user' } });

    if(!admin) {
        await userService.create({ username: 'admin',
            password: 'password',
            role: 'admin',
            active: true
        });
    }

    if (!user) {
        await userService.create({ username: 'user',
            password: 'password',
            role: 'user',
            active: true
        });
    }
};