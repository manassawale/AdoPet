import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import './adminlogin.css'; // Import custom CSS
import catlogo from '../image/cat1.jpg';

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/v1/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(login(response.data));
        navigate("/dashboard"); // Redirect to home on successful login
      } else {
        alert(`Login Error: ${response.status} - ${response.data.message}`);
      }
    } catch (error) {
      alert(`Login Error: ${error.message}`);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="admin-container">
      {/* Left Side: Pet Image */}
          <div className="image-container">
              <img src={catlogo} className="cat-image" alt="Cat" />
          </div>

      <div className="form-container">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h1 className="form-title">Login as Admin</h1>
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
              onClick={() => navigate("/")}
            >
              Login as User
            </button>
            <a href="/adregister" className="new-admin-link">New Admin</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;