import { RequestUserCreate } from '../types/request-types';
import { DBUser } from '../types/db-types';
import bcrypt from 'bcryptjs';
import { RespondUser } from '../types/respond-types';
import { Model } from 'sequelize';

export default class UserService {
    private SALT_ROUNDS = 10;

    public async getAll(User: any): Promise<RespondUser[]> {
        const users = await User.findAll();

        if (!users) {
            return [];
        }

        return users;
    }

    public async validateLogin(username: string, password: string, User: any): Promise<DBUser> {
        const user = await User.findOne({ username });

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        
        return user;
    } 

    public async get(userID: number, User: any): Promise<RespondUser> {
        const user = await User.findOne({ id: userID });

        return user;
    }

    public async create(clientUser: RequestUserCreate, User: any): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(clientUser.password, this.SALT_ROUNDS);

        const userCreated = await User.create({ 
            username: clientUser.username,
            password: hashedPassword, 
            role: clientUser.role,
            active: clientUser.active 
        });

        console.log(userCreated);
        if (!userCreated) {
            return false;
        }

        return true;
    }

    public async delete(userID: number, User: any): Promise<boolean> {
        const userDeleted = await User.destroy({ id: userID });

        if (!userDeleted) {
            return false;
        }

        return true;
    }

    public async update(userID: number, user: any, User: Model) {
        const updatedUser = await User.update({
            username: user.username,
            active: user.active,
            role: user.role
        }, { where: { id: userID }
        });

        return updatedUser;
    }
}