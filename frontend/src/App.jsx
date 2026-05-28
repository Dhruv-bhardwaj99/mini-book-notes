import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser.getIdToken();
        localStorage.setItem("firebaseToken", token);
        setUser(currentUser);
      } else {
        localStorage.removeItem("firebaseToken");
        setUser(null);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("firebaseToken");
    setUser(null);
  };

  if (authLoading) {
    return <p>Checking authentication...</p>;
  }
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand mb-4">
        <Link className="navbar-brand" to="/">
          Mini Book Notes
        </Link>

        <div className="navbar-nav me-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/books">
            Books
          </Link>
        </div>

        <div>
          {user ? (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link className="btn btn-primary btn-sm" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>

      {user && (
        <div className="alert alert-success">Logged in as: {user.email}</div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </div>
  );
};

export default App;
