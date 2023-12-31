import React, { useState, useEffect } from 'react';
import apple from '../icons/apple.png';
import xiaomi from '../icons/xiaomi.png';
import fitbit from '../icons/fitbit.png';
import smartwatch from '../icons/smart-watch.png';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const getUserIdFromToken = () => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
        console.log('Token not found in localStorage.');
        return null;
    }

    try {
        const decodedToken = jwt_decode(storedToken);
        console.log('Decoded token:', decodedToken);

        const userId = decodedToken.sub;
        return userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

function LandingPage() {
    const [latestProducts, setLatestProducts] = useState([]);
    const userId = getUserIdFromToken();

    useEffect(() => {
        console.log(localStorage)
        const fetchLatestProducts = async () => {
            try {
                const response = await fetch('https://localhost:7180/api/ProductsAPI/latest');
                if (response.ok) {
                    const data = await response.json();
                    setLatestProducts(data);
                } else {
                    throw new Error('Failed to fetch latest products');
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLatestProducts();
    }, []);

    console.log(localStorage)

    const handleProductClick = (productId) => {
        window.location.href = `/products/${productId}`;
    };

    const handleAddProductClick = async (productId) => {
        try {

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (userId) {
                const cartItemsResponse = await axios.get(`https://localhost:7180/api/CartItemsAPI/UserCartItems`, config);
                const userCartItems = cartItemsResponse.data;

                const isProductInCart = userCartItems.find(item => item.productId === productId);

                if (isProductInCart) {
                    alert('Product already added to cart!');
                } else {
                    await axios.post(`https://localhost:7180/api/CartItemsAPI`, {
                        UserId: userId,
                        ProductId: productId,
                        Quantity: 1
                    });
                    alert('Product added to cart!');
                }
            } else {
                console.log('Please log in to add products to the cart.');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleAddToWishlistClick = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            if (userId) {
                // Fetch user's wishlist items
                const wishlistResponse = await axios.get(`https://localhost:7180/api/WishlistsAPI/UserItems`, config);
                const userWishlistItems = wishlistResponse.data;

                // Check if the product already exists in the wishlist
                const isProductInWishlist = userWishlistItems.find(item => item.productId === productId);

                if (isProductInWishlist) {
                    alert('Product already exists in the wishlist!');
                } else {
                    // Add product to the wishlist
                    const response = await axios.post(`https://localhost:7180/api/WishlistsAPI`, {
                        userId: userId,
                        productId: productId
                    }, config);

                    if (response.status === 201) {
                        alert('Product added to wishlist!');
                    } else {
                        alert('Failed to add product to wishlist.');
                    }
                }
            } else {
                console.log('Please log in to add products to the wishlist.');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
        }
    };

    return (
        <div className="container body-content">
            <div className="container-fluid pt-4">
                <div className="row landing-page">
                    <div className="col-sm-4 text">
                        <h1 id="first-h1" class="display-2">Discover <br /> Most Suitable <br />Watches</h1>
                        <h3 className="lead">Find the best, reliable smart watches here. <br /> We focus on product quality. Here you can find<br /> smart watches of almost all brands. <br />Order now!</h3>
                    </div>
                    <div className="col-sm-8 photo">
                        <img id="bg-svg" src={smartwatch} alt="Alternate Text" className="img-fluid" />
                    </div>
                </div>

                <div className="row brands">
                    <div className="col-md-4">
                        <div className="element">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={apple} alt="Alternate Text" className="img-fluid" />
                                </div>
                                <div className="col-md-7">
                                    <div className="text">
                                        <h2 className="h-text">Apple</h2>
                                        <p className="p-text">Apple is one of the <br /> most famous smart <br /> watches providing <br /> company</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="element">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={xiaomi} alt="Alternate Text" className="img-fluid" />
                                </div>
                                <div className="col-md-7">
                                    <div className="text">
                                        <h2 className="h-text">Xiaomi</h2>
                                        <p className="p-text">Xiaomi smart watches <br />are produced by MI <br /> company</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="element">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={fitbit} alt="Alternate Text" className="img-fluid" />
                                </div>
                                <div className="col-md-7">
                                    <div className="text">
                                        <h2 className="h-text">Fitbit</h2>
                                        <p className="p-text">Fitbit smart watches <br /> are best for their <br /> health and fitness <br /> features</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12 text-center">
                    <h1 className="title display-4">Latest Products</h1>
                </div>
            </div>

            <section style={{ backgroundColor: '#eee' }}>
                <div className="row mx-0">
                    {latestProducts.map(product => (
                        <div key={product.id} className=" col-lg-4 ">
                            <div style={{ backgroundColor: '#eee' }}>
                                <div className="container py-5">
                                    <div className="card" >
                                        <div className="d-flex justify-content-end p-3">
                                            <div className="btn-group">
                                                <button className="btn btn-danger rounded-circle me-2" onClick={() => handleAddToWishlistClick(product.id)}>
                                                    <i className="fas fa-heart"></i>
                                                </button>
                                                <button className="btn btn-warning rounded-circle text-white" onClick={() => handleAddProductClick(product.id)}>
                                                    <i className="fas fa-shopping-cart"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <img src={product.imageUrl} style={{ cursor: 'pointer' }} onClick={() => handleProductClick(product.id)}
                                            className="card-img-top img-fluid" alt="Smart-Watch" style={{ width: '100%', maxHeight: '250px', objectFit: 'contain' }} />

                                        <div className="card-body">
                                            <div className="d-flex justify-content-between mb-3">
                                                <h5 className="mb-0 fw-bold">{product.name}</h5>
                                                <h5 className="text-dark mb-0">${product.price}</h5>
                                            </div>

                                            <div className="d-flex justify-content-between mb-2">
                                                <p className="text-muted mb-0">Available: <span class="fw-bold">{product.availableUnits}</span></p>
                                                <div className="ms-auto text-warning">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default LandingPage;