import { GetServerSideProps } from 'next';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface ProductDetailProps {
  product: Product | null;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  if (!product) return <p>Product not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <div className="flex flex-col md:flex-row">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full md:w-1/2 h-auto object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <p className="text-xl font-semibold text-gray-700 mb-4">Price: {product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hàm này sẽ chạy trên server mỗi khi có request tới trang
export const getServerSideProps: GetServerSideProps<ProductDetailProps> = async (context) => {
  const { id } = context.params as { id: string };

  try {
    // Gọi API từ server để lấy chi tiết sản phẩm theo ID
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    const product: Product = await res.json();

    // Trả về props cho component ProductDetail
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetail;