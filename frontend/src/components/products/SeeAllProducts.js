import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SeeAllProducts.css';

const ProductCard = ({ product }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: '18rem' }}>
      <img
        src={`data:image/jpeg;base64,${product.productPhoto}`}
        alt={product.productName}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">{product.productDescription}</p>
        <p className="card-text">{product.productDiscount+"% Off"} </p>
        <p className="card-text">Price: {product.productPrice}</p>
        <a href="#" className="btn btn-primary">
          Buy Now
        </a>
      </div>
    </div>
  );
};

const SeeAllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/shoppinghub/getallproduct');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="container">
        <h2>Trending Products in this days ..</h2>
        <div className="row">
          {products.map((product) => (
            <div key={product.productId} className="col-lg-3 col-md-6 col-sm-10">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeAllProducts;