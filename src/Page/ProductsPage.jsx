import React, { useState } from 'react';
import { GetProducts } from '../data/Products';
import Products from '../Components/Products';

function ProductsPage({ onAddToCart }) {
  const allProducts = GetProducts();
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  return (
    <main className="product-section" style={{ paddingTop: '2rem' }}>
      <h2 className="section-title">Tất Cả Sản Phẩm</h2>
      
      <div className="product-grid">
        <Products products={allProducts} onAddToCart={onAddToCart} productCount={visibleCount}/>
      </div>

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