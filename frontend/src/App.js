import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";

import Login from "./components/Login";
import Register from "./components/Register";
import CreateProduct from "./components/saveproduct";
import GetAll from "./components/showallproducts";
import AdminView from "./components/AdminView";
import Admin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import Logout from "./components/Logout";
import { selectUser  } from "./slices/userSlice";
import "./App.css";

import image from "../src/image/aa.jpg";
import AboutUs from "./components/AboutUs";

const App = () => {
    const user = useSelector(selectUser );
    const userType = user?.userType;
    const isLoggedInAndAdmin = user && userType === "admin";

    return (
        <div
            className="app"
            style={{
                background: 'linear-gradient(180deg, rgba(227, 208, 255, 0.87) 0%, #FFF 42.71%)',
            }}
        >
            <Container
                style={{
                    backgroundImage: `url(${image})`,
                    height: '738px',
                    width: '1440px',
                }}
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/adregister" element={<AdminRegister />} />
                        <Route path="/adlogin" element={<Admin />} />
                        <Route path="/dashboard" element={isLoggedInAndAdmin ? <AdminView /> : <Admin />} />
                        <Route path="/addpet" element={user ? <CreateProduct /> : <Login />} />
                        <Route path="/addpet/:id" element={user ? <CreateProduct /> : <Login />} />
                        <Route path="/pets" element={<GetAll />} />
                        <Route path="/aboutus" element={<AboutUs />} />
                    </Routes>
                </Router>
            </Container>
        </div>
    );
};

export default App;