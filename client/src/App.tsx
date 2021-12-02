import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";
import Login from "./components/Login";
import Chatroom from "./components/Chatroom";
import UserCreation from "./components/UserCreation";

function App() {
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
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="login" element={<Login />} />
          <Route path="create-chatroom" element={<Chatroom />} />
          <Route path="create-user" element={<UserCreation />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
