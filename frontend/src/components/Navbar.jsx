import { Link } from "react-router-dom";

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light rounded mb-4 px-3">
      <Link className="navbar-brand" to="">
        Mini Book Notes
      </Link>

      <div className="navbar-nav me-auto">
        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/books">
          Books
        </Link>

        {user && (
          <Link className="nav-link" to="/add-book">
            Add Book
          </Link>
        )}
      </div>

      <div>
        {user ? (
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link className="btn btn-primary btn-sm" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
