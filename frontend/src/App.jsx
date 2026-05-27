import { useState } from "react";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";
import Login from "./components/Login";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";

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
      <div className="mb-4">
        <h1 className="text-primary">Mini Book Notes</h1>
        <p className="text-muted">Save and manage your book notes.</p>
      </div>

      {user ? (
        <div className="alert alert-success d-flex justify-content-between align-items-center">
          <span>Logged in as: {user.email}</span>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <Login setUser={setUser} />
      )}

      {user ? (
        <AddBookForm />
      ) : (
        <div className="alert alert-warning">Please login to add books.</div>
      )}

      <BookList />
    </div>
  );
};

export default App;
