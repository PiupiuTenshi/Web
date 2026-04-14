// File: src/components/AuthModal.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Import hook

function AuthModal({ onClose }) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Khởi tạo useForm
  const { 
    register,     // Dùng để đăng ký các thẻ input vào hook
    handleSubmit, // Hàm bọc ngoài để xử lý khi bấm submit
    formState: { errors }, // Chứa các lỗi nếu người dùng nhập sai
    reset         // Dùng để xóa trắng form
  } = useForm();

  // Hàm xử lý khi người dùng nhập đúng và bấm Submit
  const onSubmit = (data) => {
    // data sẽ tự động chứa các giá trị input (ví dụ: data.email, data.password)
    console.log("Dữ liệu form:", data); 

    if (isLoginMode) {
      alert(`Đăng nhập thành công với email: ${data.email}`);
    } else {
      alert(`Đăng ký thành công tài khoản: ${data.fullName}`);
    }
    onClose(); 
  };

  // Hàm chuyển đổi Đăng nhập / Đăng ký
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    reset(); // Xóa trắng các ô nhập liệu và lỗi khi chuyển chế độ
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        
        <h2>{isLoginMode ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
        
        {/* Truyền hàm onSubmit vào handleSubmit của react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          
          {/* TRƯỜNG HỌ VÀ TÊN (Chỉ hiện khi Đăng ký) */}
          {!isLoginMode && (
            <div className="form-group">
              <label>Họ và tên</label>
              <input 
                type="text" 
                placeholder="Nhập họ và tên" 
                {...register("fullName", { required: "Vui lòng nhập họ tên" })} 
              />
              {/* Hiển thị lỗi nếu có */}
              {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
            </div>
          )}
          
          {/* TRƯỜNG EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Nhập email" 
              {...register("email", { 
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ"
                }
              })} 
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>
          
          {/* TRƯỜNG MẬT KHẨU */}
          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              placeholder="Nhập mật khẩu" 
              {...register("password", { 
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự"
                }
              })} 
            />
            {errors.password && <span className="error-text">{errors.password.message}</span>}
          </div>

          <button type="submit" className="submit-btn">
            {isLoginMode ? 'Đăng Nhập' : 'Đăng Ký'}
          </button>
        </form>

        <p className="toggle-mode">
          {isLoginMode ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          <span onClick={toggleMode}>
            {isLoginMode ? 'Đăng ký ngay' : 'Đăng nhập'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;