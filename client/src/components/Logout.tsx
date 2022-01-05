import '../App.css';

/**
 * Logout button for everybody
 * @returns HTML for logout button.
 */
const Logout: React.FC = () => {
    return (
        <div>
            <a
                className="btn btn-red btn-red:hover"
                onClick={() => {
                    localStorage.removeItem('token');
                }}
                href="/"
            >
                Logout
            </a>
        </div>
    );
};
export default Logout;
