import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      alert("Logged in successfully");
      // שמור את הטוקן ב-LocalStorage או בקונטקסט
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
