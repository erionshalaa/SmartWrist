import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Loader from './Components/Loader';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import LandingPage from './Components/LandingPage';
import Products from './Components/Products';
import ShoppingCart from './Components/ShoppingCart';
import AboutUs from './Components/AboutUs';
import ContactPage from './Components/ContactPage';
import ContactUs from './Components/ContactUs';
import './App.css';
import ProductDetails from './Components/ProductDetails';
import Wishlist from './Components/Wishlist'; 
import Search from './Components/Search';
import Success from './Components/Success';
import EditProfile from './Components/EditProfile';


    export const AuthContext = React.createContext();

    function App() {
        const [isLoggedIn, setIsLoggedIn] = useState(false);

        useEffect(() => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                setIsLoggedIn(true);
            }
        }, []);

        const handleLogin = async (email, password) => {
            try {
                setIsLoggedIn(true);
                localStorage.setItem('token', 'your_token_here'); 
                
            } catch (error) {
                console.error('Login failed:', error);
            }
        };

        const handleLogout = () => {
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
                            <Route path="/products" element={<Products />} />
                            <Route path="/aboutus" element={<AboutUs />} />
                            <Route path="/shoppingcart" element={<ShoppingCart />} />
                            <Route path="/contactpage" element={<ContactPage />} />
                            <Route path="/contactus" element={<ContactUs />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/success" element={<Success />} />
                            <Route path="/editprofile" element={<EditProfile />} />
                            <Route path="/products/:productId" element={<ProductDetails />} />
                        </Routes>
                        <Footer />
                    </AuthContext.Provider>
                </Router>
            </div>
        );
    }



export default App;
