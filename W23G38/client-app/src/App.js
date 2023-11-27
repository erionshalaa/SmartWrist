import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Loader from './Components/Loader';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import LandingPage from './Components/LandingPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <Loader />
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}



export default App;
