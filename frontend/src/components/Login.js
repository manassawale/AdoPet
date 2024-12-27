import React, { useState } from "react";
import { login } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import catlogo from '../image/cat1.jpg';
import './Login.css'; // Import the custom CSS file
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/v1/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(login(response.data));
        navigate("/pets");
      }
    } catch (error) {
      console.error("Login Error:", error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      {/* Left Side: Pet Image */}
      <div className="image-container">
        <img src={catlogo} className="cat-image" alt="Cat" />
      </div>

      {/* Right Side: Login Form */}
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="form-title">User  Login</h1>
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
          <div className="alternative-login">
            <button
              className="link-btn"
              onClick={() =>{
                navigate("/adlogin");
              }}
            >
              Login as Admin
            </button>
            <br />
            <button
              className="link-btn"
              onClick={() => window.location.href = "/register"}
            >
              New here? Create an account!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;