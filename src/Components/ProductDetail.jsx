
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetProducts } from '../data/Products';

function ProductDetail({ onAddToCart }) {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const allProducts = GetProducts();

  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>Không tìm thấy sản phẩm!</h2>;
  }

  // 3. Hiển thị chi tiết
  return (
    <div className="product-section product-detail-container">
      
      {/* Cột trái: Hình ảnh */}
      <div className="product-detail-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-detail-image"
        />
      </div>

      {/* Cột phải: Thông tin */}
      <div className="product-detail-info">
        <span className="badge product-detail-badge">
          {product.category}
        </span>
        
        <h1 className="product-detail-title">
          {product.name}
        </h1>
        
        <p className="product-detail-price">
          {product.price}
        </p>
        
        <p className="product-detail-description">
          <strong>Mô tả chi tiết:</strong> {product.description}
        </p>
        
        {/* Nhóm nút bấm */}
        <div className="product-detail-actions">
          {/* Mình thêm class "btn-large" để phóng to 2 nút này đều nhau */}
          <button 
            className="add-to-cart-btn btn-large" 
            onClick={() => onAddToCart(product)}
          >
            Thêm vào giỏ hàng
          </button>
          
          <button 
            className="continue-products btn-large" 
            onClick={() => navigate(-1)} 
          >
            Quay lại
          </button>
        </div>
      </div>

    </div>
  );
}

export default ProductDetail;