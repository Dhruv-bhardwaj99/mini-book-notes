// import AddBookForm from "../components/AddBookForm";
import { Link } from "react-router-dom";
import BookList from "../components/BookList";
// import AddBookForm from "../components/AddBookForm";

const Books = ({ user }) => {
  if (!user) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <h2 className="card-title">Please login first</h2>

          <p className="text-muted">
            You need to login in to view and manage your personal book notes.
          </p>

          <Link className="btn btn-primary" to="/login">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* <AddBookForm /> */}
      <BookList />
    </div>
  );
};

export default Books;
