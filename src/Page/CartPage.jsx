// File: src/Page/CartPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage({ cartItems }) {
  const navigate = useNavigate();

  return (
    <main className="product-section cart-page-container">
      <h2 className="section-title">Giỏ Hàng Của Bạn</h2>
      
      {cartItems.length === 0 ? (
        <>
          <div className="empty-cart-message">
            <p>Hiện tại chưa có sản phẩm nào trong giỏ hàng.</p>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/11329/11329973.png" 
              alt="Empty Cart" 
              className="empty-cart-image"
            />
          </div>
          <Link to="/products" className="cta-btn empty-cart-link">
              Tiếp tục mua sắm
          </Link>
        </>
      ) : (
        <div className="cart-items-container">
          
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item-row">
              {/* Hình ảnh sản phẩm */}
              <img 
                src={item.image} 
                alt={item.name} 
                className="cart-item-image"
              />
              
              {/* Thông tin sản phẩm */}
              <div className="cart-item-info">
                <h3 className="cart-item-title">
                  {item.name}
                </h3>
                <p className="cart-item-price">
                  {item.price}
                </p>
              </div>
              
              {/* Nút xóa */}
              <button className="cart-remove-btn">
                Xóa
              </button>
            </div>
          ))}

          {/* Khu vực thanh toán */}
          <div className="cart-checkout-container">
             <button 
               className="cta-btn checkout-btn"
               onClick={() => navigate('/checkout')} 
             >
                Tiến hành thanh toán
             </button>
          </div>
          
        </div>
      )}
    </main>
  );
}

export default CartPage;