"use client";

import Image from 'next/image';
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
  image: string; // Image should be a string that points to the image name in /public/images
}

const ProductDetailPage = () => {
  const params = useParams(); // Retrieve the params using the useParams hook
  const [product, setProduct] = useState<Product | null>(null); // Initially null to indicate loading

  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetching the product data based on the ID from params
    const products: Product[] = [
      {
        id: 1,
        name: "LED Light Bulb",
        price: 5.99,
        description: "An energy-efficient LED light bulb, perfect for long-lasting illumination.",
        image: "led-lightbulb.jpg",
      },
      {
        id: 2,
        name: "Halogen Light Bulb",
        price: 3.99,
        description: "A bright halogen light bulb, perfect for clear visibility.",
        image: "halogen-lightbulb.jpg",
      },
    ];

    const fetchedProduct = products.find((p) => p.id === parseInt(params.id as string));

    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      // Optionally handle a case where the product is not found
      console.error("Product not found");
    }
  }, [params]);

  const handleAddToCart = () => {
    if (!product) return; // Ensure product exists before trying to add to cart

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

  if (!product) {
    // Show a loading message or spinner while product data is being fetched
    return (
      <div className="container mx-auto p-10 text-center">
        <ClipLoader size={50} color="#3b82f6" /> {/* Loading spinner */}
        <p className="mt-4 text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-10">
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={`/images/${product.image}`}
            alt={`Product image of ${product.name}`}
            className="rounded-md"
            width={400}
            height={400}
          />
        </div>

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
