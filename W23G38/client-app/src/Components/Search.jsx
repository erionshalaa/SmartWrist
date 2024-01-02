import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const getUserIdFromToken = () => {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
        console.log('Token not found in localStorage.');
        return null;
    }

    try {
        const decodedToken = jwt_decode(storedToken);

        const userId = decodedToken.sub;
        return userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const searchQuery = new URLSearchParams(window.location.search).get('query');
    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                if (searchQuery) {
                    const response = await axios.get(`https://localhost:7180/api/ProductsAPI/Search?query=${searchQuery}`);
                    setSearchResults(response.data);
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

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
                const wishlistResponse = await axios.get(`https://localhost:7180/api/WishlistsAPI/UserItems`, config);
                const userWishlistItems = wishlistResponse.data;
                const isProductInWishlist = userWishlistItems.find(item => item.productId === productId);

                if (isProductInWishlist) {
                    alert('Product already exists in the wishlist!');
                } else {
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
        <div>
            <h1>Search Results for "{searchQuery}"</h1>
            {searchResults.length > 0 ? (
            <div className="row mx-0">
                {searchResults.map((product, index) => (
                    <div key={index} className=" col-lg-3 ">
                        <div style={{ backgroundColor: '#eee' }}>
                            <div className="container py-5">
                                <div className="card" style={{ cursor: 'pointer' }} >
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
                                            <p className="text-muted mb-0">Status: <span class="fw-bold">{product.availableUnits}</span></p>
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
            ) : (
                <h1 className="d-flex justify-content-center mt-5">No results found for "{searchQuery}"</h1>
            )}
        </div>
    );
}

export default Search;
