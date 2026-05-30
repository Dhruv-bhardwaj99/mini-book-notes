// import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";

const Books = () => {
  return (
    <div>
      {/* {user ? (
        <AddBookForm />
      ) : (
        <div className="alert alert-warning">Please login to add books.</div>
      )} */}

      <BookList />
    </div>
  );
};

export default Books;
