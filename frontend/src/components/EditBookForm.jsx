import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { UPDATE_BOOK } from "../graphql/bookMutations";
import { GET_BOOKS } from "../graphql/bookQueries";

const EditBookForm = ({ book, onCancel }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [notes, setNotes] = useState(book.notes || "");

  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateBook({
      variables: {
        id: book._id,
        title,
        author,
        notes,
      },
    });

    onCancel();
  };
  return (
    <div className="border rounded p-3 bg-light">
      <h5>Edit Book</h5>
      {error && <div className="alert alert-danger">{error.message}</div>}
      <form onSubmit={handleSubmit} action="">
        <div className="mb-2">
          <label className="form-label" htmlFor="">
            Title
          </label>
          <input
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="" className="form-label">
            Author
          </label>
          <input
            className="form-control"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="" className="form-label">
            Notes
          </label>
          <textarea
            className="form-control"
            rows="3"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <button className="btn btn-success btn-sm me-2" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          className="btn btn-secondary btn-sm"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
