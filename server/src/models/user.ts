import { ClientUser } from '../types/client-types';
import { DBUser } from '../types/db-types';
import { db } from '../db/postgres';
import bcrypt from 'bcryptjs';


export default class User {


    public getAll(): DBUser[] {
        throw new Error('Method not implemented');
    }

    public async validateLogin(username: string, password: string): Promise<DBUser> {
        const user = await db<DBUser>('users').where({ username }).first();

        if(!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid email or password');
        }
        
        return user;
    } 

    public async get(userID: number): Promise<DBUser> {
        const user = await db<DBUser>('users').where({ id: userID }).first();
        // lägg till error skit
        return user;
    }

    public create(clientUser: ClientUser): void {
        throw new Error('Method not implemented');
    }

    public update(userID: number): void {
        throw new Error('Method not implemented');
    }
}