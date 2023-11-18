import React from 'react';
import clockIcon from '../icons/clock.png';
import searchIcon from '../icons/search.png';
import userIcon from '../icons/user.png';
import heartIcon from '../icons/heart.png';
import bagIcon from '../icons/shopping-bag.png';

function Navbar() {
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
                                    <li>
                                        <a href="/" className="dropdown-item btn text-light">Action</a> 
                                    </li>
                                    <li>
                                        <a href="/" className="dropdown-item btn text-light">Action</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item me-3">
                                <a href="/" className="nav-link">Products</a>
                            </li>
                            <li className="nav-item me-3">
                                <a href="/" className="nav-link">About</a>
                            </li>
                            <li className="nav-item me-3 ">
                                <a href="/" className="nav-link">Contact</a>
                            </li>

                           
                        </ul>

                        <ul class="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a href="/" class="nav-link">
                                    <img src={searchIcon} id="img-item" alt="Search" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="Login" class="nav-link">
                                    <img src={userIcon} id="img-item" alt="User" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/" class="nav-link">
                                    <img src={heartIcon} id="img-item" alt="Favorites" />
                                </a>
                            </li>
                            <li className="nav-item">
                                <a href="/" class="nav-link">
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
