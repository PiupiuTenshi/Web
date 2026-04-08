// File: src/Components/Cart.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CartPage({ cartItems }) {

    return (
    <main className="product-section" style={{ padding: '4rem 5%', textAlign: 'center' }}>
      <h2 className="section-title">Giỏ Hàng Của Bạn</h2>
      {cartItems.length === 0 ? (
        <>
          <div style={{ margin: '2rem 0' }}>
            <p>Hiện tại chưa có sản phẩm nào trong giỏ hàng.</p>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/11329/11329973.png" 
              alt="Empty Cart" 
              style={{ width: '150px', marginTop: '1rem', opacity: 0.5 }}
            />
          </div>
          <Link to="/products" className="cta-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Tiếp tục mua sắm
          </Link>
        </>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          
          {cartItems.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem', 
              borderBottom: '1px solid #e5e7eb', 
              padding: '1rem 0' 
            }}>
              {/* Hình ảnh sản phẩm */}
              <img 
                src={item.image} 
                alt={item.name} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              
              {/* Thông tin sản phẩm */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {item.price}
                </p>
              </div>
              
              {/* Nút xóa (Hiện tại để cho đẹp, sau này bạn có thể code thêm chức năng xóa) */}
              <button style={{ 
                padding: '0.5rem 1rem', 
                backgroundColor: '#f3f4f6', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                color: '#ef4444',
                fontWeight: 'bold'
              }}>
                Xóa
              </button>
            </div>
          ))}

          {/* Nút thanh toán tổng */}
          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
             <button className="cta-btn" style={{ backgroundColor: '#10b981' }}>
                Tiến hành thanh toán
             </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartPage;