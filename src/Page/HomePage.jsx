
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 Dùng để chuyển trang bằng code
import Products from '../Components/Products.jsx';

function HomePage({ products, onAddToCart }) {
  const navigate = useNavigate();
  const productCount = 3;

  return (
    <>
      <section className="banner">
        <h1>Thế Giới Công Nghệ Đỉnh Cao</h1>
        <p>Khám phá những thiết bị điện tử mới nhất với giá cực ưu đãi.</p>
        <button className="cta-btn" onClick={() => navigate('/products')}>
          Mua sắm ngay
        </button>
      </section>

      <main className="product-section">
        <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
        <Products products={products} onAddToCart={onAddToCart} productCount={productCount}/>
      </main>
    </>
  );
}

export default HomePage;