// File: src/App.jsx
import React, { useState } from 'react';
import './App.css';
import AuthModal from './Components/SignUpForm.jsx'; // Import Component vừa tạo

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Laptop Gaming Pro X',
      price: '25.990.000₫',
      category: 'Laptop',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: 'Smartphone Ultra 5G',
      price: '18.500.000₫',
      category: 'Điện thoại',
      image: 'https://images.unsplash.com/photo-1688762473728-3a20023e1fe4?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 3,
      name: 'Tai nghe Bluetooth Noise Cancelling',
      price: '3.200.000₫',
      category: 'Phụ kiện',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 4,
      name: 'Màn hình Cong 34 inch 144Hz',
      price: '12.000.000₫',
      category: 'Màn hình',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60'
    }
  ];

  const handleAddToCart = (productName) => {
    setCartCount(cartCount + 1);
    alert(`Đã thêm "${productName}" vào giỏ hàng thành công!`);
  };

  const handleShopNowClick = () => {
    const productSection = document.getElementById('product-list');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">TechShop</div>
        <nav className="nav-links">
          <a href="#">Trang chủ</a>
          <a href="#">Sản phẩm</a>
          <a href="#">Khuyến mãi</a>
          <a href="#">Liên hệ</a>
        </nav>
        <div className="cart-btn">🛒 Giỏ hàng ({cartCount})</div>
        {/* Nút mở Modal */}
        <div 
          className="login-btn" 
          onClick={() => setShowAuthModal(true)}
        > 
          Đăng nhập/Đăng ký
        </div>
      </header>

      <section className="banner">
        <h1>Thế Giới Công Nghệ Đỉnh Cao</h1>
        <p>Khám phá những thiết bị điện tử mới nhất với giá cực ưu đãi.</p>
        <button className="cta-btn" onClick={handleShopNowClick}>Mua sắm ngay</button>
      </section>

      <main id="product-list" className="product-section">
        <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="badge">{product.category}</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart(product.name)}
                >
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 TechShop. Bản quyền thuộc về bạn.</p>
      </footer>

      {/* Gọi Component Modal. Truyền vào prop onClose để modal tự biết cách báo App đóng nó đi */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

export default App;