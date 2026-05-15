import { useQuery } from "@apollo/client/react";
import { GET_BOOKS } from '../graphql/bookQueries';

const BookList = () => {
    const {loading, error, data} = useQuery(GET_BOOKS)

    if(loading){
        return(
            <div>
                <p>Loading books...</p>
            </div>
        )
    }
    if(error){
        return(
            <div>
                <p>Error loading books: {error.message}</p>
            </div>
        )
    }
  return (
    <div>
      <h2>
        Books
      </h2>

      {data.books.length === 0 ? (
        <p>No Books found.</p>
      ) : (
        <ul>
            {data.books.map((book) =>(
                <li key={book.id}>
                    <strong>{book.title}</strong> by {book.author}
                    {book.notes && <p>{book.notes}</p>}
                </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default BookList;
