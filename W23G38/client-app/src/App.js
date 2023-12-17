import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Loader from './Components/Loader';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import LandingPage from './Components/LandingPage';
import ShoppingCart from './Components/ShoppingCart';
import AboutUs from './Components/AboutUs';
import './App.css';





    export const AuthContext = React.createContext();

    function App() {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            // Check if the user is logged in when the app starts
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setIsLoggedIn(true);
            }
        }, []);

        const handleLogin = async (email, password) => {
            try {
                // Perform login logic here (e.g., send login request to backend)
                // If login successful, set isLoggedIn to true and store token in local storage
                setIsLoggedIn(true);
                localStorage.setItem('token', 'your_token_here'); // Replace with actual token

                // Redirect the user to the desired page after successful login
            } catch (error) {
                console.error('Login failed:', error);
            }
        };

        const handleLogout = () => {
            // Perform logout logic here (e.g., clear token from local storage, reset state)
            setIsLoggedIn(false);
            localStorage.removeItem('token');
        };

        return (
            <div className="App">
                <Router>
                    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
                        <Loader/>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/signup" element={<SignupForm />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/shoppingcart" element={<ShoppingCart />} />
                        </Routes>
                        <Footer />
                    </AuthContext.Provider>
                </Router>
            </div>
        );
    }



export default App;
