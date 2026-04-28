
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Products({ products, onAddToCart, productCount}){
  const navigate = useNavigate(); 

  return (
  <>
    <div className="product-grid">
      {products.slice(0, productCount).map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <span className="badge">{product.category}</span>
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <div className="product-actions">
              <button 
                className = "view-detail-btn"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                Xem chi tiết
              </button>
              <button 
                className="add-to-cart-btn" 
                onClick={() => onAddToCart(product)}
              >
                Thêm vào giỏ
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>);
}

export default Products;