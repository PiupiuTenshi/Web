import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import './App.css';

import ProductsPage from './Page/ProductsPage.jsx'; 
import HomePage from './Page/HomePage.jsx'; 
import CartPage from './Page/CartPage.jsx';
import CheckOutPage from './Page/CheckOutPage.jsx';

import AuthModal from './Components/SignUpForm.jsx'; 
import ProductDetail from './Components/ProductDetail.jsx';

import { GetProducts } from './data/Products.js';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('techshop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem('techshop_cart', JSON.stringify(cartItems));
  }, [cartItems]);
  const cartCount = cartItems.length;
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const featuredProducts = GetProducts();

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
  };

const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCartItems(user.cart || []);
  };

  const clearCart = () => {
    setCartItems([]); 
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]); // Xóa giỏ hàng trên máy khi thoát
    localStorage.removeItem('techshop_cart');
    alert("Bạn đã đăng xuất.");
  };

  useEffect(() => {
    // Chỉ đồng bộ khi đã đăng nhập và giỏ hàng có sự thay đổi
    if (currentUser && currentUser.id) {
      const syncCart = async () => {
        try {
          await fetch(`https://lnpdp9rp-8000.asse.devtunnels.ms/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: cartItems })
          });
        } catch (error) {
          console.error("Lỗi đồng bộ giỏ hàng:", error);
        }
      };
      syncCart();
    }
  }, [cartItems, currentUser]);

  return (
    <div className="app-container">
      <header className="navbar">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          TechShop
        </Link>
        <nav className="nav-links">
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
            <span className="user-name logout-btn has-tooltip" onClick={handleLogout} data-tooltip="Đăng xuất" >Chào, {currentUser.fullName}
            </span>
          </div>
        ) : (
          <div className="login-btn" onClick={() => setShowAuthModal(true)}> 
            Đăng nhập/Đăng ký
          </div>
        )}
      </header>

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
        <Route 
          path="/checkout" 
          element={
            <CheckOutPage 
              cartItems={cartItems} 
              clearCart={clearCart} 
              currentUser={currentUser} 
            />
          } 
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