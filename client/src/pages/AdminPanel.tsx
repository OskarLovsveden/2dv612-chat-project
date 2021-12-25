import {
    useEffect,
    useState
} from 'react';
import moderatorImg from '../images/moderator.png';
import chattareImg from '../images/chattare.png';
import { AdminPanelUsers, User } from '../types/User';
import ROLE from '../types/Role';
import UserService from '../utils/http/user-service';
import RoomList from '../components/AdminPanelComponents/RoomsList/RoomList';
import UsersList from '../components/AdminPanelComponents/UsersList/UsersList';

const AdminPanel = () => {
    const [users, setUsers] = useState<AdminPanelUsers>({ chatters: [], moderators: [] });

    useEffect(() => {
        (async () => {
            const userService = new UserService();
            const resUser = await userService.getAll();

            const moderators = resUser.data.filter((user: User) => user.role === ROLE.MOD);
            const chatters = resUser.data.filter((user: User) => user.role === ROLE.USER);

            setUsers({ chatters: [...chatters], moderators: [...moderators] });
        })();
    }, []);

    const removeUser = async (id: number, userType: ROLE) => {
        const userService = new UserService();
        await userService.delete(id);

        if (userType === ROLE.MOD) {
            setUsers({
                chatters: [...users.chatters],
                moderators: [...users.moderators.filter((user: User) => user.id !== id)]
            });
        } else if(userType === ROLE.USER){
            setUsers({
                chatters: [...users.chatters.filter((user: User) => user.id !== id)],
                moderators: [...users.moderators]
            });
        }
    };


    return (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-indigo-600 h-screen">
            <RoomList />
            <UsersList 
                title="Moderator"
                listRoleImg={moderatorImg}
                users={users.moderators}
                removeUser={(id: number) => removeUser(id, ROLE.MOD)}
            />
            <UsersList 
                title="Chattare"
                listRoleImg={chattareImg}
                users={users.chatters}
                removeUser={(id: number) => removeUser(id, ROLE.USER)}
            />
        </div>
    );
};

export default AdminPanel;
