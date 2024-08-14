import axios from "axios";
import { useEffect, useState } from "react";
const PageProduct = ({ products = [] }) => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // Gọi API khi component được mount
  //   axios
  //     .get("https://fakestoreapi.com/products")
  //     .then((response: { data: any }) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error: any) => {
  //       console.error("Có lỗi xảy ra khi gọi API:", error);
  //     });
  // }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Danh Sách Sản Phẩm</h1>
      <div className="max-w-7xl mx-auto px-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product: any) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-xl font-medium text-gray-700">{product.price}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Mua ngay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  // Gọi API từ server
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  // Trả về props cho component Products
  return {
    props: {
      products,
    },
  };
}
export default PageProduct;

