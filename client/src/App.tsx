import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AdminPanel from "./pages/Admin-panel";
import Home from "./pages/Home";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";
import UserCreation from "./components/User-creation";
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const navigate = useNavigate();

  const onLogin = (username: string) => {
    console.log(username);
    setLoggedInUser("Bob");
    navigate("/home");
  };

  return (
    <div className="App">
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

          <Link className="no-underline hover:underline" to="/create-chatroom">
            Create Chatroom
          </Link>

          <Link className="no-underline hover:underline" to="/create-user">
            Create user
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<Login login={(username: string) => onLogin(username)} />}
          />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="home" element={<Home user={loggedInUser} />} />
          <Route path="create-chatroom" element={<Chatroom />} />
          <Route path="create-user" element={<UserCreation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
