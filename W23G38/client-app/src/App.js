import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import LandingPage from './Components/LandingPage';
import Loader from './Components/Loader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';


function App() {
    return (
        <div className="App">
            <Loader />
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
}



export default App;
