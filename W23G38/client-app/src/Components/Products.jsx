import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://localhost:7180/api/ProductsAPI')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);
    console.log(products);

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
                                            <div className="card">
                                                <div className="d-flex justify-content-end p-3">
                                                    <div className="btn-group">
                                                        <button className="btn btn-danger rounded-circle me-2">
                                                            <i className="fas fa-heart"></i>
                                                        </button>
                                                        <button className="btn btn-warning rounded-circle text-white">
                                                            <i className="fas fa-shopping-cart"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <img src={product.imageUrl}
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

