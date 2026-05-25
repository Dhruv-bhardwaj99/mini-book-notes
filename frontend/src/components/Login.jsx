import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
