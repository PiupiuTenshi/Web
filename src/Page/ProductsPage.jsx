// File: src/components/Products.jsx
import React, { useState } from 'react';
import { GetProducts } from '../data/Products';
import Products from '../Components/Products';

function ProductsPage({ onAddToCart }) {
  // Dữ liệu toàn bộ sản phẩm (Nhiều hơn ở trang chủ)
  const allProducts = GetProducts();

  const [visibleCount, setVisibleCount] = useState(6);

  // 2. Hàm xử lý khi bấm nút "Xem tiếp" (Cộng thêm 4)
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <main className="product-section" style={{ paddingTop: '2rem' }}>
      <h2 className="section-title">Tất Cả Sản Phẩm</h2>
      
      <div className="product-grid">
        <Products products={allProducts} onAddToCart={onAddToCart} productCount={visibleCount}/>
      </div>

      {/* 4. CHỈ HIỂN THỊ NÚT NẾU VẪN CÒN SẢN PHẨM BỊ ẨN */}
      {visibleCount < allProducts.length && (
        <div className="load-more-container">
          <button className="continue-products" onClick={handleLoadMore}>
            Xem tiếp ↓
          </button>
        </div>
      )}
    </main>
  );
}

export default ProductsPage;