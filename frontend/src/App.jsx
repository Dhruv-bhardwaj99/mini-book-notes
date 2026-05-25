import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";
import Login from "./components/Login";

const App =() => {
  return (
    <div>
      <h1>Mini Book Notes</h1>
      <p>Frontend is connected and running.</p>

      <Login />
      <AddBookForm />
      <BookList />
    </div>
  );
}

export default App;