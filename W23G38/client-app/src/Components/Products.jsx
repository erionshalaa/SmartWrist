import React, { useState, useEffect } from 'react';
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



function ProductList({ categoryId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = getUserIdFromToken();


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('category');

        const fetchData = async () => {
            try {
                setLoading(true);

                if (categoryId) {
                    const response = await axios.get(`https://localhost:7180/api/ProductsAPI/ByCategory/${categoryId}`);
                    setProducts(response.data);
                } else {
                    const response = await axios.get('https://localhost:7180/api/ProductsAPI');
                    setProducts(response.data);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);



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

    return (
        <section>
            <h1>Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="row mx-0">
                    {products.map(product => (
                        <div key={product.id} className=" col-lg-3 ">
                            <div style={{ backgroundColor: '#eee' }}>
                                <div className="container py-5">
                                    <div className="card" style={{ cursor: 'pointer' }} >
                                        <div className="d-flex justify-content-end p-3">
                                            <div className="btn-group">
                                                <button className="btn btn-danger rounded-circle me-2">
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
            )}
        </section>
    );
}

export default ProductList;

