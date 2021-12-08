import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPanel from "./pages/Admin-panel";
import Home from "./pages/Home";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";
import Private from "./components/routes/Private";
import Public from "./components/routes/Public";
import ROLE from "./types/Role";
import UserCreation from "./components/User-creation";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      {user?.role === ROLE.ADMIN && (
        <header className="App-header">
          <nav className="pb-4 border-b-2 border-fuchsia-600 space-x-2 text-center">
            <Link className="no-underline hover:underline" to="/">
              Home
            </Link>
            <Link className="no-underline hover:underline" to="/admin">
              Admin
            </Link>

            <Link className="no-underline hover:underline" to="/login">
              Login
            </Link>

            <Link
              className="no-underline hover:underline"
              to="/create-chatroom"
            >
              Create Chatroom
            </Link>

            <Link className="no-underline hover:underline" to="/create-user">
              Create user
            </Link>
          </nav>
        </header>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Public component={Login} />} />
          <Route
            path="create-chatroom"
            element={<Private roles={[ROLE.ADMIN]} component={Chatroom} />}
          />
          <Route
            path="create-user"
            element={<Private roles={[ROLE.ADMIN]} component={UserCreation} />}
          />
          <Route
            path="admin"
            element={<Private roles={[ROLE.ADMIN]} component={AdminPanel} />}
          />
          <Route
            path="home"
            element={
              <Private roles={[ROLE.ADMIN, ROLE.USER]} component={Home} />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
