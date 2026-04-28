import React, { useState, useEffect } from 'react';
import Products from '../Components/Products';
import { ProductService } from '../api/ProductService'; 

function ProductsPage({ onAddToCart, activeCategory }) {
  const [allProducts, setAllProducts] = useState([]); 
  const [loading, setLoading] = useState(true);       
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); 
      
      const data = await ProductService.getAllProducts();
      if (data) {
        setAllProducts(data); 
      }
      
      setLoading(false); 
    };
    
    fetchProducts();
  }, []); 

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };
  
  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(item => item.category === activeCategory);

  return (
    // Đã thay thế style inline bằng class products-page-container
    <main className="product-section products-page-container">
      
      <h2 className="section-title">
        {activeCategory === 'All' ? 'Tất Cả Sản Phẩm' : `Danh Mục: ${activeCategory}`}
      </h2>
      
      {loading ? (
        // Đã thay thế style inline bằng class loading-message
        <div className="loading-message">
          ⏳ Đang tải dữ liệu từ máy chủ...
        </div>
      ) : (
        <>
          <div className="product-grid">
            <Products products={filteredProducts} onAddToCart={onAddToCart} productCount={visibleCount}/>
          </div>

          {visibleCount < filteredProducts.length && (
            <div className="load-more-container">
              <button className="continue-products" onClick={handleLoadMore}>
                Xem tiếp ↓
              </button>
            </div>
          )}
        </>
      )}
      
    </main>
  );
}

export default ProductsPage;