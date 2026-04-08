
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import './App.css';
import AuthModal from './Components/SignUpForm.jsx'; 
import ProductsPage from './Page/ProductsPage.jsx'; 
import HomePage from './Page/HomePage.jsx'; 
import CartPage from './Page/CartPage.jsx';
import ProductDetail from './Components/ProductDetail.jsx';
import { GetProducts } from './data/Products.js';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.length;
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const featuredProducts = GetProducts();

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
  };


  const handleLoginSuccess = (userName) => {
    setCurrentUser(userName); // Lưu tên người dùng
  };

  const handleLogout = () => {
    setCurrentUser(null); // Xóa thông tin người dùng
    alert("Bạn đã đăng xuất thành công!");
  };

  return (
    <div className="app-container">
      <header className="navbar">
        {/* Dùng Link thay cho the div hay the a */}
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          TechShop
        </Link>
        <nav className="nav-links">
          {/* Thay thẻ <a href="..."> bằng <Link to="..."> */}
          <Link to="/">Trang chủ</Link>
          <Link to="/products">Sản phẩm</Link>
          <Link to="/promotion">Khuyến mãi</Link>
          <Link to="/contact">Liên hệ</Link>
        </nav>
        <Link to="/cart" className="cart-btn">
          🛒 Giỏ hàng ({cartCount})
        </Link>
        {currentUser ? (
          <div className="user-profile">
            <span className="user-name logout-btn has-tooltip" onClick={handleLogout} data-tooltip="Đăng xuất" >Chào, {currentUser}
            </span>
          </div>
        ) : (
          <div className="login-btn" onClick={() => setShowAuthModal(true)}> 
            Đăng nhập/Đăng ký
          </div>
        )}
      </header>

      {/* KHU VỰC THAY ĐỔI THEO URL */}
      <Routes>
        <Route 
          path="/" 
          element={<HomePage products={featuredProducts} onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/products" 
          element={<ProductsPage onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/cart" 
          element={<CartPage cartItems={cartItems} />} 
        />
        <Route 
          path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} 
        />
      </Routes>

      <footer className="footer">
        <p>&copy; 2026 TechShop. Bản quyền thuộc về bạn.</p>
      </footer>

      {showAuthModal && (
        <AuthModal 
        onClose={() => setShowAuthModal(false)} 
        onLogin={handleLoginSuccess}/>
      )}
    </div>
  );
}

export default App;