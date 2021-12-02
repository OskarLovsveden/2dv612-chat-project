import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPanel from "./pages/AdminPanel";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav className="pb-4 border-b-2 border-fuchsia-600">
          <Link className="no-underline hover:underline" to="/">
            Home
          </Link>
          <Link className="no-underline hover:underline" to="/admin">
            Admin
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
