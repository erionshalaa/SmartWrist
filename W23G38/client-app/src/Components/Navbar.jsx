import React, { useState, useEffect } from 'react';
import clockIcon from '../icons/clock.png';
import searchIcon from '../icons/search.png';
import userIcon from '../icons/user.png';
import heartIcon from '../icons/heart.png';
import bagIcon from '../icons/shopping-bag.png';
import axios from 'axios';

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsLoggedIn(!!storedToken);

        axios.get('https://localhost:7180/api/CategoriesAPI')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setShowDropdown(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setShowDropdown(false);
        localStorage.removeItem('token');

    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const handleCategoryClick = categoryId => {
        window.location.href = `/Products?category=${categoryId}`;
    };

    const handleSearchButtonClick = () => {
        setShowSearchInput(true); 
    };

    const handleSearch = async () => {
        try {
            if (searchQuery.trim() === '') {
                return;
            }
            window.location.href = `/Search?query=${searchQuery}`;
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };



    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.99)' }}>
                <div className="container">
                    <a href="/" className="navbar-brand">
                        <img style={{ width: '60px' }} src={clockIcon} alt="Logo" />
                        SmartWrist
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item me-3 ms-4">
                                <a href="/" className="nav-link">Home</a>
                            </li>
                            <li className="nav-item dropdown me-3">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Brands
                                </a>
                                <ul className="dropdown-menu bg-dark " aria-labelledby="navbarDropdown">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            <button className="dropdown-item btn text-light" onClick={() => handleCategoryClick(category.id)}>
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item me-3">
                                <a href="/Products" className="nav-link">Products</a>
                            </li>
                            <li className="nav-item me-3">
                                <a href="/AboutUs" className="nav-link">About</a>
                            </li>
                            <li className="nav-item me-3 ">
                                <a href="/ContactPage" className="nav-link">Contact</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ms-auto">
                            <li className="nav-item" style={{cursor: 'pointer'} }>
                                <a className="nav-link" onClick={handleSearchButtonClick}>
                                    <img src={searchIcon} id="img-item" alt="Search" />
                                </a>
                            </li>

                            {showSearchInput && (
                                <li className="nav-item mt-1">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        className="form-control"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onBlur={() => setShowSearchInput(false)}
                                    />
                                </li>
                            )}


                            {isLoggedIn && (
                                <li className="nav-item">
                                    <a className="nav-link dropdown" onBlur={closeDropdown}>
                                        <img
                                            src={userIcon}
                                            id="img-item"
                                            alt="User"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded={showDropdown ? 'true' : 'false'}
                                            onClick={toggleDropdown}
                                        />
                                        <ul className={`dropdown-menu bg-dark ${showDropdown ? 'show' : ''}`}>
                                            <li>
                                                <a href="/editprofile" className="dropdown-item btn text-light " >
                                                    My Account
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/" className="dropdown-item btn text-light " onClick={handleLogout}>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </a>
                                </li>
                            )}

                            {!isLoggedIn && (
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={handleLogin}>
                                        <img src={userIcon} id="img-item" alt="User" />
                                    </a>
                                </li>
                            )}
                            <li className="nav-item">
                                <a href="/wishlist" class="nav-link">
                                    <img src={heartIcon} id="img-item" alt="Favorites" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/ShoppingCart" class="nav-link">
                                    <img src={bagIcon} id="img-item" alt="Shopping Bag" />
                                </a>
                            </li>
                        </ul>



                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
