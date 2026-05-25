import { useState } from "react";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";
import Login from "./components/Login";

const App =() => {
  const [user, setUser] = useState(null);

  const handleLogout = () =>{
    localStorage.removeItem("firebaseToken");
    setUser(null)
  }
  return (
    <div>
      <h1>Mini Book Notes</h1>
      
      {user ? (
        <div>
          <p>Logged in as: user.email</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login setUser={setUser} />
      )}
      <AddBookForm />
      
      <BookList />
    </div>
  );
}

export default App;