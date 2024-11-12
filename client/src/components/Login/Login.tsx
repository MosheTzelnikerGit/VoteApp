import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser } from "../../store/userSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginStatus = useSelector((state: RootState) => state.user.status);

  const handleLogin =async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser({ username, password })).unwrap();
    navigate("/candidates");
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      {loginStatus === "loading" && <p>Logging in...</p>}
      {loginStatus === "failed" && <p>Login failed. Please check your credentials.</p>}
      {loginStatus === "succeeded" && <p>Login successful!</p>}
      <p>Don't have an account ? <Link to="/register">Register</Link></p>
    </form>
  );
};

export default Login;
