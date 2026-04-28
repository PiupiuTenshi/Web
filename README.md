### Nội dung file README.md

```markdown
# 🛒 TechShop - Website Thương Mại Điện Tử Công Nghệ

TechShop là một ứng dụng Full-stack hoàn chỉnh giúp người dùng khám phá và mua sắm các thiết bị công nghệ đỉnh cao. Dự án kết hợp sức mạnh xử lý dữ liệu của **ASP.NET Core** và giao diện mượt mà của **React**.

## 🏗️ Cấu trúc thư mục
Dự án được tổ chức theo mô hình ngang hàng giữa Backend và Frontend:
```text
tech-shop/
├── TechShopBackend/      # Source code Backend (ASP.NET Core Web API)
│   ├── Controllers/      # Các Endpoint xử lý POST, GET, PUT, DELETE
│   ├── Models/           # Định nghĩa cấu trúc Product, User
│   ├── Data/             # Cấu hình Entity Framework (AppDbContext)
│   └── appsettings.json  # Cấu hình Connection String tới SQL Server
├── src/                  # Source code Frontend (React)
│   ├── components/       # Các thành phần giao diện (AuthModal, Navbar...)
│   ├── services/         # Nơi quản lý gọi API (ProductService.js)
│   ├── pages/            # Các trang chính (HomePage, ProductsPage)
│   └── App.jsx           # Cấu trúc Routing và Logic chính
├── public/               # Tài nguyên tĩnh (Hình ảnh, Icons)
├── package.json          # Quản lý thư viện Frontend
└── README.md
```

## 🚀 Công nghệ sử dụng

### Backend
- **Framework:** ASP.NET Core Web API (.NET 8.0/9.0)
- **ORM:** Entity Framework Core
- **Database:** SQL Server (Chạy trên Docker)
- **Authentication:** Tích hợp logic xử lý tài khoản Google.

### Frontend
- **Library:** React (Vite)
- **Styling:** CSS3 (Custom Responsive cho Mobile/Desktop)
- **API Client:** Axios
- **Form Handling:** React Hook Form
- **Auth:** Google OAuth (@react-oauth/google) & JWT Decode.

## 🛠️ Hướng dẫn cài đặt

### 1. Cấu hình Backend
1. Đảm bảo máy đã cài **.NET SDK** và **Docker**.
2. Mở file `TechShopBackend/appsettings.json` và cập nhật chuỗi kết nối SQL Server (User: `sa`, Password của Docker của bạn).
3. Di chuyển vào thư mục backend và chạy Migration:
   ```bash
   cd TechShopBackend
   dotnet ef database update
   dotnet run
   ```

### 2. Cấu hình Frontend
1. Cài đặt các thư viện cần thiết:
   ```bash
   npm install
   ```
2. Mở file `src/main.jsx`, thay thế `clientId` bằng mã **Google Client ID** bạn đã khởi tạo trên Google Cloud Console.
3. Kiểm tra cổng API trong `src/services/ProductService.js` (Ví dụ: `http://localhost:5284`).
4. Khởi động dự án:
   ```bash
   npm run dev
   ```

## ✨ Tính năng chính
- **Xác thực đa dạng:** Đăng nhập truyền thống và Đăng nhập nhanh qua Google (Tự động lưu thông tin vào SQL Server).
- **Quản lý sản phẩm:** Hệ thống CRUD (Thêm, Xóa, Sửa, Lấy dữ liệu) kết nối trực tiếp với Database thật.
- **Giao diện hiện đại:**
    - Thanh Navbar thông minh, tự động thu gọn trên Mobile.
    - Chế độ "Xem tiếp" (Load more) mượt mà cho danh sách sản phẩm.
    - Hiệu ứng Loading chuyên nghiệp khi chờ dữ liệu từ server.

## 👤 Tác giả
- **Họ tên:** Sáng Phạm Minh
- **Chuyên ngành:**Kỹ thuật phần mềm (PTIT)
```

