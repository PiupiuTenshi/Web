import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Products from '../Components/Products.jsx';
import { ProductService } from '../api/ProductService'; // Gọi anh "Shipper" vào

function HomePage({ onAddToCart }) {
  const navigate = useNavigate();
  
  // Quản lý state cho sản phẩm nổi bật và trạng thái loading
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tự động gọi API khi trang chủ vừa load lên
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      
      if (data) {
        // Cắt lấy 4 sản phẩm đầu tiên làm "Nổi Bật" (Bạn có thể đổi số 4 thành 3 tùy ý)
        setFeaturedProducts(data.slice(0, 3)); 
      }
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

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
        
        {/* Hiển thị chữ loading trong lúc chờ Backend trả dữ liệu */}
        {loading ? (
          <div className="loading-message">
            ⏳ Đang tải sản phẩm nổi bật...
          </div>
        ) : (
          <div className="product-grid">
            <Products products={featuredProducts} onAddToCart={onAddToCart} />
          </div>
        )}
      </main>
    </>
  );
}

export default HomePage;