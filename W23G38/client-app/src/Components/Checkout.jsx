import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

function Checkout() {
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
        } catch (error) {
            console.error('Error fetching user cart items:', error);
        }
    };


    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0).toFixed(2);
    };

    const handleClick = async () => {
        try {
            await fetchUserCartItems(); 
           
            const sessionResponse = await axios.post('https://localhost:7180/api/PaymentAPI/create-checkout-session',  cartItems );
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



    const handleSubmit = async (event) => {
        event.preventDefault(); 

        try {
            const formData = {
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
            };
            
            
            handleClick();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container pt-5">
            <div className="row pt-5">
                <div className="col-md-4 order-md-2 mb-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted">Your cart</span>
                    </h4>
                    <ul className="list-group mb-3">
                        {cartItems.map((item) => (
                            <li key={item.cartItemId} className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{item.product.name}</h6>
                                    <small className="text-muted">Quantity  {item.quantity}</small>
                                </div>
                                <span className="text-muted">${item.product.price}</span>
                            </li>
                        ))}

                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>${calculateTotal()}</strong>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8 order-md-1">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="form-floating">
                                    <input type="text" required id="firstName" className="form-control form-control-lg" placeholder=" " />
                                    <label className="form-label" htmlFor="firstName">First name</label>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-floating">
                                    <input type="text" id="lastName" className="form-control form-control-lg" placeholder=" "
                                        required />
                                    <label className="form-label" htmlFor="lastName">Last name</label>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating mb-4">
                                <input type="email" id="email" className="form-control form-control-lg" placeholder=" "
                                    required />
                                <label className="form-label" htmlFor="email">Email address</label>
                            </div>
                        </div>
                       
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-floating mb-4">
                                    <input type="text" id="address" className="form-control form-control-lg" placeholder=" "
                                        required />
                                    <label className="form-label" htmlFor="email">Address Line 1</label>
                                </div>
                            </div>
                            <div className="col-md-6 ">
                                <div className="form-floating mb-4">
                                    <input type="text" id="address2" className="form-control form-control-lg" placeholder=" " />
                                    <label className="form-label" htmlFor="email">Address Line 2 (Optional)</label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="form-floating mb-4">
                                <input type="tel" id="phone" className="form-control form-control-lg" placeholder=" "
                                    required />
                                <label className="form-label" htmlFor="phone">Phone Number</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5 mb-3">
                                <select class="form-select " aria-label="Default select example" id="country" required>
                                    <option value="">Country</option>
                                    <option>Kosova</option>
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <select class="form-select" aria-label="Default select example" id="state" required>
                                    <option value="">State</option>
                                    <option>Prishtine</option>
                                    <option>Mitrovice</option>
                                    <option>Gjilan</option>
                                    <option>Peje</option>
                                    <option>Ferizaj</option>
                                    <option>Prizren</option>
                                    <option>Gjakove</option>
                                </select>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="form-floating mb-2">
                                    <input type="text" id="zip" className="form-control form-control-lg" placeholder=" "
                                        required />
                                    <label className="form-label" htmlFor="zip">Zip</label>
                                </div>
                            </div>
                        </div>
                        <div className="checkbox mb-3">
                            <input type="checkbox" className="form-check-input" id="same-address" />
                            <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit"  >Continue</button>

                    </form>
                </div>
            </div>
        </div>


    );
}

export default Checkout;