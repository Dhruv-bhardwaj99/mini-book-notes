import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from "../graphql/bookQueries";

const BookList = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) {
    return <div className="alert alert-info">Loading books...</div>;
  }
  if (error) {
    return (
      <div className="alert alert-danger">
        Error loading books: {error.message}
      </div>
    );
  }
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Books</h2>
        {data.books.length === 0 ? (
          <div className="alert alert-secondary">No Books found.</div>
        ) : (
          <div className="row">
            {data.books.map((book) => (
              <div className="col-md-6 mb-3" key={book.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      by {book.author}
                    </h6>
                  </div>
                </div>
                {book.notes && <p className="card-text">{book.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
