import { Link } from 'react-router-dom';
import type { User } from '../../../types/User';
import editUserImg from '../../../images/edit.png';

type ListItemProps = {
    user: User;
    removeUser: (id: number) => void;
};

const ListItem: React.FC<ListItemProps> = ({ user, removeUser }) => {
    return (
        <li>
            <div className="inline-flex space-x-4 ">
                <h4>{user.username} </h4>
                <button
                    type="button"
                    onClick={() => {
                        removeUser(user.id);
                    }}
                    className="btn btn-red btn-red:hover"
                >
                    REMOVE
                </button>
                <Link to="/create-user">
                    <img
                        className="w-12 h-12 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                        src={editUserImg}
                        alt="Edit"
                    />
                </Link>
            </div>
        </li>
    );
};

export default ListItem;
