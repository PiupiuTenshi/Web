// File: src/Page/CheckoutPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function CheckoutPage({ cartItems = [], clearCart, currentUser }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { fullName: currentUser || '' }
  });

  // Tính tổng tiền an toàn (tránh lỗi nếu giá bị null)
  const totalPrice = cartItems.reduce((total, item) => {
    const priceStr = item?.price || "0";
    const priceNumber = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return total + priceNumber;
  }, 0);

  const onSubmitOrder = async (data) => {
    const newOrder = {
      customerInfo: data,
      items: cartItems,
      totalAmount: totalPrice,
      orderDate: new Date().toISOString()
    };

    try {
      const response = await fetch('https://lnpdp9rp-8000.asse.devtunnels.ms/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });

      if (response.ok) {
        alert("Đặt hàng thành công!");
        clearCart();
        navigate('/');
      }
    } catch (error) {
      alert("Lỗi kết nối server!");
    }
  };

  if (cartItems.length === 0) {
    return <div className="cart-page-container"><h2>Giỏ hàng trống!</h2><button onClick={() => navigate('/products')} className="cta-btn">Mua sắm ngay</button></div>;
  }

  return (
    <main className="product-section checkout-container">
      <h2 className="section-title">Thanh Toán</h2>
      <div className="checkout-layout">
        <div className="checkout-form-section">
          <h3>Thông tin giao hàng</h3>
          <form onSubmit={handleSubmit(onSubmitOrder)} className="auth-form">
            <div className="form-group">
              <label>Họ tên</label>
              <input {...register("fullName", { required: "Cần nhập họ tên" })} />
              {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
            </div>
            <div className="form-group">
              <label>Địa chỉ</label>
              <input {...register("address", { required: "Cần nhập địa chỉ" })} />
              {errors.address && <span className="error-text">{errors.address.message}</span>}
            </div>
            <button type="submit" className="submit-btn">Xác nhận đặt hàng</button>
          </form>
        </div>
        
        <div className="checkout-summary-section">
          <h3>Tóm tắt đơn hàng</h3>
          <div className="checkout-total">
            <span>Tổng tiền:</span>
            <span className="total-amount">{totalPrice.toLocaleString('vi-VN')}₫</span>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;