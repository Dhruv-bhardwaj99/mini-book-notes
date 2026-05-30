import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const token = await userCredential.user.getIdToken();

      localStorage.setItem("firebaseToken", token);

      setUser(userCredential.user);

      setMessage("Login successful");
      setEmail("");
      setPassword("");
      navigate("/")
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title mb-3">Login</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label" htmlFor="Email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
