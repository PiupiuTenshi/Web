import axios from 'axios';

const API_URL = 'https://lnpdp9rp-5281.asse.devtunnels.ms/api/products'; // Thay đổi port theo máy bạn

export const ProductService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Danh sách sản phẩm:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  },

  // POST: Thêm sản phẩm mới
  addProduct: async (newProduct) => {
    try {
      const response = await axios.post(API_URL, newProduct);
      console.log("Đã thêm thành công:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  },

  // PUT: Cập nhật sản phẩm
  updateProduct: async (id, updatedProduct) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
      console.log("Cập nhật thành công!");
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  },

  // DELETE: Xóa sản phẩm
  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log("Đã xóa sản phẩm!");
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  }
};