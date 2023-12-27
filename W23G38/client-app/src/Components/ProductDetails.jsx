
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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


function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://localhost:7180/api/ProductsAPI/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);



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



    return (
        <div>
            <h2>Product Details</h2>
            {product ? (
                <div style={{ backgroundColor: '#eee' }}>
                    <div className="container py-5">
                        <div className="card" >
                            <div className="row">
                                <div class="col-sm-7">
                                    <img src={product.imageUrl}
                                        className="card-img-top img-fluid " alt="Smart-Watch" style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }} />
                                </div>

                                <div class="col-sm-5">
                                    <div className="card-body">
                                        <div className="d-flex  mb-3 mt-5">
                                            <h4 className="mb-0 ">{product.name}</h4>
                                        </div>

                                        <div className="d-flex  mb-2">
                                            <p className="text-muted mb-0">Available: <span class="fw-bold">{product.availableUnits}</span></p>
                                        </div>
                                        <div className="d-flex  mt-4"><h2 className="text-dark mb-0">${product.price}</h2></div>
                                        <div className="d-flex  mt-4"><h6 className="text-grey mb-0 lh-3">{product.description}</h6> </div>
                                        <div className="d-flex mt-5">
                                            <button className="btn btn-warning" onClick={() => handleAddProductClick(product.id)}
                                                style={{ marginRight: '10px', border: '1px solid lightgray' }}><i class="fa-solid fa-cart-shopping"
                                                    style={{ marginRight: '8px' }}></i>Add To Cart
                                            </button>
                                            <button className="btn btn-light" style={{ border: '1px solid lightgray' }}><i class="fa-regular fa-heart"></i></button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    );
}

export default ProductDetails;
