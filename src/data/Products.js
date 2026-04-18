  const allProducts = [
    { id: 1, name: 'Laptop Gaming Pro X', price: '25.990.000₫', category: 'Laptop', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=60', description: 'Cấu hình siêu khủng với vi xử lý thế hệ mới nhất, card đồ họa rời mạnh mẽ giúp bạn chiến mượt mọi tựa game AAA. Màn hình 144Hz chuẩn màu thiết kế.' },
    { id: 2, name: 'Smartphone Ultra 5G', price: '18.500.000₫', category: 'Điện thoại', image: 'https://images.unsplash.com/photo-1688762473728-3a20023e1fe4?auto=format&fit=crop&w=500&q=60', description: 'Trải nghiệm tốc độ 5G siêu tốc, camera 108MP chụp đêm xuất sắc và dung lượng pin khủng 5000mAh dùng trọn cả ngày dài.' },
    { id: 3, name: 'Tai nghe Bluetooth Noise Cancelling', price: '3.200.000₫', category: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=60', description: 'Công nghệ chống ồn chủ động ANC hàng đầu, âm thanh Hi-Res chân thực và thiết kế công thái học đeo thoải mái suốt nhiều giờ.' },
    { id: 4, name: 'Màn hình Cong 34 inch 144Hz', price: '12.000.000₫', category: 'Màn hình', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=500&q=60', description: 'Đắm chìm vào thế giới ảo với độ cong hoàn hảo 1000R, tần số quét 144Hz mượt mà không độ trễ, tối ưu tuyệt đối cho Game thủ và Editor.' },
    { id: 5, name: 'Bàn phím cơ Quang Học', price: '1.850.000₫', category: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=60', description: 'Tốc độ phản hồi cực nhanh chỉ 0.2ms nhờ switch quang học, hệ thống LED RGB 16.8 triệu màu tùy chỉnh sinh động.' },
    { id: 6, name: 'Chuột Gaming Không Dây', price: '1.200.000₫', category: 'Phụ kiện', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=500&q=60', description: 'Trọng lượng siêu nhẹ, mắt đọc quang học độ phân giải cao 25.000 DPI, kết nối không dây độ trễ cực thấp.' },
    { id: 7, name: 'Tablet Pro 11 inch', price: '15.400.000₫', category: 'Máy tính bảng', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=60', description: 'Sức mạnh thay thế laptop với chip M-series, màn hình Liquid Retina sống động, hỗ trợ bút cảm ứng vẽ vời cực mượt.' },
    { id: 8, name: 'Loa Bluetooth Bass Boost', price: '2.500.000₫', category: 'Âm thanh', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=60', description: 'Âm bass bùng nổ, chống nước chuẩn IP67 thoải mái mang đi bơi hay dã ngoại, thời lượng pin lên đến 15 giờ liên tục.' },
    
  ];

export function GetProducts() {
  return allProducts;
}