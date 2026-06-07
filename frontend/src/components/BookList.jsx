import { useQuery, useMutation } from "@apollo/client/react";
import { GET_BOOKS } from "../graphql/bookQueries";
import { DELETE_BOOK } from "../graphql/bookMutation";

const BookList = () => {
    console.log("object__1", useQuery(GET_BOOKS))
  const { loading, error, data } = useQuery(GET_BOOKS);

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries:[{query: GET_BOOKS}]
  });

  const handleDelete = async(id) =>{
    await deleteBook({
        variables:{id}
    });
  }
  console.log("object__2", deleteBook)

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
          </div>
            <p className="mt-3 mb-0">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error.message}</div>;
  }

  return (
    <div className="card mb-4">
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <h2 className="card-title mb-0">
                        Books
                    </h2>
                    <p className="text-muted mb-0">
                        {data.books.length} book{data.books.length !== 1? "s" : ""} saved
                    </p>
                </div>
            </div>

            {data.books.length ===0? (
                <div className="text-center border rounded p- bg-light">
                    <h5>No books yet</h5>
                    <p className="text-muted mb-0">Login and add your first book note.</p>
                </div>
            ) : (
                <div className="row">
                    {data.books.map((book) => (
                        <div className="col-md-6 col-lg-4 mb-3" key={book.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <span className="badge bg-primary mb-2">Book</span>

                                    <h5 className="card-title">{book.title}</h5>

                                    <h6 className="card-subtitle mb-2 text-muted">
                                        by {book.author}
                                    </h6>

                                    {book.notes ? (
                                        <p>{book.notes}</p>
                                    ): (
                                        <p className="card-text text-muted">No notes added</p>
                                    )}

                                    <button className="btn btn-outline-danger btn-sm"  onClick={() => handleDelete(book.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
}

export default BookList;
