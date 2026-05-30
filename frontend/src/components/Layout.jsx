import Navbar from "./Navbar";

const Layout = ({ user, handleLogout, children }) => {
  return (
    <div className="container py-4">
      <Navbar user={user} handleLogout={handleLogout} />

      {user && (
        <div className="alert alert-success">Logged in as: {user.email}</div>
      )}

      <main>{children}</main>
    </div>
  );
};

export default Layout;
