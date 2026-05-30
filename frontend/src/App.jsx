import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./config/firebase";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AddBook from "./pages/AddBook";
import Layout from "./components/Layout";

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
    <Layout user={user} handleLogout={handleLogout}>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/add-book"
          element={
            <ProtectedRoute user={user}>
              <AddBook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
