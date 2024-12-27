import React, { useState } from "react";
import axios from "axios";
import catlogo from '../image/cat1.jpg'; // Import your image
import "./register.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/api/v1/users", {
      name: name,
      email: email,
      password: password
    }).then((response) => {
      console.log(response);
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-container">
      {/* Left Side: Pet Image */}
      <div className="image-container">
        <img src={catlogo} className="cat-image" alt="Cat" />
      </div>

      {/* Right Side: Registration Form */}
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Sign up here as user</h1>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;