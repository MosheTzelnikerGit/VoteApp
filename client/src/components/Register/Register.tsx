// components/Register.tsx
import React, { useState } from "react";
import axios from "axios";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name: name, // name הוא השדה הנוסף שצריך לשלוח
        email: email,
        password: password
      });
      console.log(response.data); // תוכל להוסיף כאן הודעה או רפרש אחרי הרשמה מוצלחת
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };
  

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
