import React, { useState } from 'react';

const ShoppingCart = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', description: 'Product Description 1', price: 19, image: 'product1.jpg' },
    // Add more products as needed
  ]);

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="container mt-4">
      <div className="card" style={{ marginTop: '100px' }}>
        <div className="card-body">
          <h2 className="card-title" style={{fontWeight: 'bold',color:'rgba(255, 165, 0, 1.0)' }}>Shopping Cart</h2>

          {products.map(product => (
            <div key={product.id} className="row mb-3">
              <div className="col-md-3">
                <img src={product.image} alt={`${product.name} Image`} className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
              </div>
              <div className="col-md-3 text-right">
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          ))}

          <div className="row">
            <div className="col-md-9">
              <h4 className="card-text">Total: ${calculateTotal()}</h4>
            </div>
            <br/>
            <div className="col-md-4">
            <br/>
              <button className="btn btn-success btn-block">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;