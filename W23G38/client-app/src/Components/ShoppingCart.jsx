import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

<script src="https://kit.fontawesome.com/3459e15a2d.js" crossorigin="anonymous"></script>

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            fetchUserCartItems();
        }
    }, []);

    const fetchUserCartItems = async () => {
        try {

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const response = await axios.get('https://localhost:7180/api/CartItemsAPI/UserCartItems', config);
            setCartItems(response.data);
            console.log('API response:', response.data);
        } catch (error) {
            console.error('Error fetching user cart items:', error);
        }
    };


    const updateCartItemQuantity = async (cartItemId, newQuantity) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            };

            if (newQuantity < 1) {
                newQuantity = 1;
            }

            console.log('Updating quantity:', cartItemId, newQuantity);

            const response = await axios.put(`https://localhost:7180/api/CartItemsAPI/UpdateQuantity/${cartItemId}`, newQuantity, config);

            console.log('Quantity update response:', response);

            if (response.status === 204) {
                fetchUserCartItems();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };


    const deleteCartItem = async (cartItemId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const confirmDelete = window.confirm('Are you sure you want to delete this item from the cart?');

            if (confirmDelete) {
                const response = await axios.delete(`https://localhost:7180/api/CartItemsAPI/${cartItemId}`, config);

                if (response.status === 204) {
                    fetchUserCartItems();
                }
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };


    const clearCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const confirmClear = window.confirm('Are you sure you want to clear the cart? This action cannot be undone.');

            if (confirmClear) {
                const response = await axios.delete(`https://localhost:7180/api/CartItemsAPI`, config);

                if (response.status === 204) {
                    fetchUserCartItems();
                }
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0).toFixed(2);
    };

    const handleClick = async () => {
        try {

            const sessionResponse = await axios.post('https://localhost:7180/api/PaymentAPI/create-checkout-session', cartItems);
            const session = sessionResponse.data;

            const stripe = await loadStripe('pk_test_51OVAlQI0XTOHhZpHB5Ko9pKBZNCeVq4etiEYLgJC6KD17ZgebMkJHPJWafKyTbaDRZ13EOxduQZtu95lhITkknZf00ljF0doxg');
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,

            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
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
                                <th className="text-center">Quantity</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Subtotal</th>
                                <th className="text-center"><a class="btn btn-sm btn-outline-danger" onClick={clearCart}>Clear Cart</a></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.cartItemId} >
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
                                    <td className="text-center align-middle">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity - 1)}
                                            >-</button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button className="btn btn-sm btn-outline-secondary"
                                                onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                    </td>
                                    <td className="text-center align-middle">${item.product.price}</td>
                                    <td className="text-center align-middle">${(item.product.price * item.quantity).toFixed(2)}</td>
                                    <td className="text-center align-middle">
                                        <button className="btn btn-sm" style={{ marginRight: '10px' }} onClick={() => deleteCartItem(item.cartItemId)}><i class="fa-solid fa-xmark"></i></button>
                                        <button className="btn btn-sm"><i class="fa-regular fa-heart"></i></button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td className="fw-bold text-center">Total:</td>
                                <td colSpan="2"></td>
                                <td className="text-center">${calculateTotal()}</td>
                                <td colSpan="3"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>



                <div className="row shopping-cart-footer">
                    <div className="col-md-6 col-sm-12 mb-3">
                        <a className="btn btn-outline-secondary" href="/products">Back to Shopping</a>
                    </div>
                    <div className="col-md-6 col-sm-12 mb-3  d-flex justify-content-end">
                        <a className="btn btn-success" onClick={handleClick}>Checkout</a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ShoppingCart;