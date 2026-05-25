import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ADD_BOOK } from "../graphql/bookMutation";
import { GET_BOOKS } from "../graphql/bookQueries";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [notes, setNotes] = useState("");

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    await addBook({
      variables: {
        title,
        author,
        notes,
      },
    });

    setTitle("");
    setAuthor("");
    setNotes("");
  };
  return (
    <div>
      <h2>Add Book</h2>
      {error && <p>Error: {error.message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Author</label>
          <input
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Notes</label>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
