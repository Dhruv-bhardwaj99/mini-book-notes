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
    <div>
      <h1>Mini Book Notes</h1>

      {user ? (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login setUser={setUser} />
      )}

      {user ? (
        <AddBookForm />

      ) : (
        <p>Please login to add books.</p>
      )}

      <BookList />
    </div>
  );
};

export default App;