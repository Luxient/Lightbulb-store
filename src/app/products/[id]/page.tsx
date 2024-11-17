"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../features/cartSlice";
import { AppDispatch } from "../../../store/store";
import { ClipLoader } from "react-spinners";
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string | null; // image can be null initially
}

const ProductDetailPage = () => {
  const params = useParams(); // Retrieve the params using the useParams hook
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: null, // Use null instead of empty string initially
  });

  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetching the product data based on the ID from params
    const fetchedProduct: Product = {
      id: parseInt(params.id as string),
      name: "Halogen Light Bulb",
      price: 3.99,
      description: "A bright halogen light bulb, perfect for clear visibility.",
      image: "/images/halogen-lightbulb.jpg",
    };
    setProduct(fetchedProduct);
  }, [params]);

  const handleAddToCart = () => {
    setLoading(true);
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    );

    setTimeout(() => {
      setLoading(false);
      setFeedbackMessage("Item added to the cart successfully!");
      setTimeout(() => setFeedbackMessage(null), 3000); // Remove message after 3 seconds
    }, 500); // Simulate a short loading time for UX purposes
  };

  return (
    <div className="container mx-auto p-10">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        {product.image && ( // Render only if product.image is not null
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={`Product image of ${product.name}`}
              className="rounded-md"
            />
          </div>
        )}

        {/* Product Info */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            Price: ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 transition-transform duration-300 hover:scale-105 hover:bg-blue-500 active:scale-95"
            disabled={loading}
            >
            {loading ? <ClipLoader size={20} color="#ffffff" /> : "Add to Cart"}
          </button>

          {feedbackMessage && (
            <p className="mt-4 text-green-600 text-lg">{feedbackMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
