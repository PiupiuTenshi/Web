// File: src/components/AuthModal.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';

function AuthModal({ onClose, onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { 
    register,     // Dùng để đăng ký các thẻ input vào hook
    handleSubmit, // Hàm bọc ngoài để xử lý khi bấm submit
    formState: { errors }, // Chứa các lỗi nếu người dùng nhập sai
    reset         // Dùng để xóa trắng form
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (isLoginMode) {
        // 1. XỬ LÝ ĐĂNG NHẬP (Lấy dữ liệu từ file JSON ra check)
        // Gọi API để tìm user có email và password khớp với người dùng nhập
        const response = await fetch(`https://lnpdp9rp-8000.asse.devtunnels.ms/users?email=${data.email}&password=${data.password}`);
        const users = await response.json(); // Chuyển kết quả về dạng mảng

        // Nếu mảng users lớn hơn 0, nghĩa là tìm thấy tài khoản
        if (users.length > 0) {
          const loggedInUser = users[0]; // Lấy tài khoản đầu tiên tìm được
          alert(`Đăng nhập thành công! Chào mừng ${loggedInUser.fullName}`);
          onLogin(loggedInUser); // Báo cho App biết đã đăng nhập
          onClose(); // Đóng form
        } else {
          // Nếu mảng rỗng nghĩa là sai email hoặc mật khẩu
          alert("Email hoặc mật khẩu không chính xác!");
        }

      } else {
        // 2. XỬ LÝ ĐĂNG KÝ (Ghi dữ liệu vào file JSON)
        // (Tùy chọn) Kiểm tra xem email đã tồn tại chưa
        const checkEmailRes = await fetch(`https://lnpdp9rp-8000.asse.devtunnels.ms/users?email=${data.email}`);
        const existingUsers = await checkEmailRes.json();
        
        if (existingUsers.length > 0) {
          alert("Email này đã được sử dụng! Vui lòng chọn email khác.");
          return; // Dừng lại không đăng ký nữa
        }

        // Dùng lệnh POST để lưu tài khoản mới vào file JSON
        const response = await fetch('https://lnpdp9rp-8000.asse.devtunnels.ms/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fullName: data.fullName,
            email: data.email,
            password: data.password,
            cart: data.cart
          })
        });

        if (response.ok) {
          alert("Đăng ký thành công! Vui lòng đăng nhập.");
          setIsLoginMode(true); // Tự động chuyển form sang chế độ Đăng nhập
          reset(); // Xóa trắng các ô input
        }
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      alert("Không thể kết nối đến máy chủ. Bạn đã bật json-server chưa?");
    }
  };

  // --- 2. XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ TỰ ĐỘNG BẰNG GOOGLE ---
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Dịch mã JWT Google gửi về để lấy Tên và Email
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name } = decoded;

      // Kiểm tra xem email này đã từng đăng nhập vào TechShop chưa
      const checkRes = await fetch(`https://lnpdp9rp-8000.asse.devtunnels.ms/users?email=${email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        // TRƯỜNG HỢP 1: ĐÃ CÓ TÀI KHOẢN -> Cho đăng nhập luôn
        const loggedInUser = existingUsers[0];
        alert(`Chào mừng ${loggedInUser.fullName} quay trở lại qua Google!`);
        onLogin(loggedInUser);
        onClose();
      } else {
        // TRƯỜNG HỢP 2: CHƯA CÓ TÀI KHOẢN -> Tự động tạo và lưu vào json-server
        const newUser = {
          fullName: name,
          email: email,
          password: "google_account", // Ghi chú đây là acc Google để khỏi check pass
          cart: []
        };

        const postRes = await fetch('https://lnpdp9rp-8000.asse.devtunnels.ms/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        });

        if (postRes.ok) {
          const createdUser = await postRes.json();
          alert(`Tạo tài khoản Google thành công! Chào mừng ${createdUser.fullName}`);
          onLogin(createdUser);
          onClose();
        }
      }
    } catch (error) {
      console.error("Lỗi xác thực Google:", error);
      alert("Kết nối máy chủ thất bại khi đăng nhập Google.");
    }
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

        {/* --- KHU VỰC NÚT ĐĂNG NHẬP GOOGLE --- */}
        <div className="google-login-container">
          <p className="google-login-text">
            hoặc tiếp tục với
          </p>
          <div className="google-login-wrapper">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                console.log('Đăng nhập Google thất bại');
              }}
              shape="rectangular"
              text="signin_with"
            />
          </div>
        </div>

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