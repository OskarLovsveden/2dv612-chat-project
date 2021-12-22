import { RequestUserCreate } from '../types/request-types';
import { DBUser } from '../types/db-types';
import { db } from '../db/postgres';
import bcrypt from 'bcryptjs';
import { RespondUser } from '../types/respond-types';


export default class User {
    private USER_TABLE = 'users';
    private SALT_ROUNDS = 10;

    public async getAll(): Promise<RespondUser[]> {
        const users = await db<DBUser>(this.USER_TABLE);

        if (!users) {
            return [];
        }

        const usersArray: RespondUser[] = users.map((u: DBUser) => {
            return {
                active: u.active,
                id: u.id,
                role: u.role,
                username: u.username
            };
        });

        return usersArray;
    }

    public async validateLogin(username: string, password: string): Promise<DBUser> {
        const user = await db<DBUser>(this.USER_TABLE).where({ username }).first();

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        
        return user;
    } 

    public async get(userID: number): Promise<RespondUser> {
        const user = await db<DBUser>(this.USER_TABLE).where({ id: userID }).first();

        return user;
    }

    public async create(clientUser: RequestUserCreate): Promise<boolean> {
        const hashedPassword = await bcrypt.hash(clientUser.password, this.SALT_ROUNDS);

        const userCreated = await db(this.USER_TABLE).insert({ 
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

    public async delete(userID: number): Promise<boolean> {
        const userDeleted = await db.from(this.USER_TABLE).where({ id: userID }).del();

        if (!userDeleted) {
            return false;
        }

        return true;
    }

    public async update(id: number, active: boolean): Promise<boolean> {
        const updatedUser = await db.from(this.USER_TABLE).where({ id }).update({ active });

        if (!updatedUser) {
            return false;
        }

        return true;
    }
}