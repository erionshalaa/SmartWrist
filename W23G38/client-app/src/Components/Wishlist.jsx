import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


<script src="https://kit.fontawesome.com/3459e15a2d.js" crossorigin="anonymous"></script>

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

const Wishlist = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const userId = getUserIdFromToken();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            fetchUserWishlistItems();
        }
    }, []);

    const fetchUserWishlistItems = async () => {
        try {

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get('https://localhost:7180/api/WishlistsAPI/UserItems', config);
            setWishlistItems(response.data);
            console.log('API response:', response.data);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        }
    };

    const deleteWishlistItem = async (wishlistItems) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            console.log(wishlistItems)
            const confirmDelete = window.confirm('Are you sure you want to delete this item from the list?');

            if (confirmDelete) {
                const response = await axios.delete(`https://localhost:7180/api/WishlistsAPI/${wishlistItems.id}`, config);

                if (response.status === 204) {
                    fetchUserWishlistItems();
                }
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
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
                const productDetailsResponse = await axios.get(`https://localhost:7180/api/ProductsAPI/${productId}`, config);
                const productDetails = productDetailsResponse.data;

                if (productDetails.availableUnits === 'Available') {
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
                    alert('Product is not available for purchase.');
                }
            } else {
                console.log('Please log in to add products to the cart.');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };



    const clearWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const confirmClear = window.confirm('Are you sure you want to clear the list? This action cannot be undone.');

            if (confirmClear) {
                const response = await axios.delete(`https://localhost:7180/api/WishlistsAPI`, config);

                if (response.status === 204) {
                    fetchUserWishlistItems();
                }
            }
        } catch (error) {
            console.error('Error clearing wishlist:', error);
        }
    };

    return (
        <div>

            <div className="container" style={{ paddingTop: '100px' }} >
                <div className="table-responsive shopping-cart">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Product</th>
                                <th className="text-center">Price</th>
                                <th className="text-center"><a class="btn btn-sm btn-outline-danger" onClick={clearWishlist} >Clear List</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistItems.map((item) => (
                                <tr key={item} >
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item.product.imageUrl}
                                                className="card-img-top img-fluid"
                                                style={{ width: '60%', maxHeight: '120px', objectFit: 'contain' }}
                                                alt="Smart-Watch"
                                            />
                                            <h5>{item.product.name}</h5>
                                        </div>
                                    </td>
                                    <td className="text-center align-middle">${item.product.price}</td>
                                    <td className="text-center align-middle">
                                        <button className="btn btn-sm" style={{ marginRight: '10px' }} onClick={() => deleteWishlistItem(item)} ><i class="fa-solid fa-xmark"></i></button>
                                        <button className="btn btn-sm"><i class="fa-solid fa-cart-shopping" onClick={() => handleAddProductClick(item.product.id)}></i></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>



                <div className="row shopping-cart-footer">
                    <div className="col-md-6 col-sm-12 mb-3">
                        <a className="btn btn-outline-secondary" href="/products">Back to Shopping</a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Wishlist;