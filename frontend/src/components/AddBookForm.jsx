import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { ADD_BOOK } from "../graphql/bookMutations";
import { GET_BOOKS } from "../graphql/bookQueries";
import { toast } from "react-toastify";

const AddBookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [notes, setNotes] = useState("");

  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBook({
        variables: {
          title,
          author,
          notes,
        },
      });

      toast.success("Book added successfully");
      setTitle("");
      setAuthor("");
      setNotes("");
    } catch (error) {
      console.error("Error in Add books", error);
      toast.error("Failed to add Book");
    }
  };
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Add Book</h2>

        {error && (
          <div className="alert alert-danger">Error: {error.message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="">
              Author
            </label>
            <input
              className="form-control"
              type="text"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="Notes">
              Notes
            </label>
            <textarea
              className="form-control"
              rows="4"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </div>

          <button className="btn btn-success" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
