"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";
import { AppDispatch } from "../store/store";
import { ClipLoader } from "react-spinners";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLoading(true);
    dispatch(
      addItem({
        id,
        name,
        price,
        quantity: 1,
      })
    );

    setTimeout(() => {
      setLoading(false);
      setFeedbackMessage("Item added to the cart!");

      // Remove feedback message after 2 seconds
      setTimeout(() => setFeedbackMessage(null), 2000);
    }, 500);
  };

  const handleCardClick = () => {
    router.push(`/products/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md transition-transform duration-200 transform hover:scale-105 cursor-pointer relative"
    >
      <Image
        src={image}
        alt={`Product image of ${name}`}
        width={200}
        height={200}
        className="rounded-md"
      />
      <h3 className="mt-4 text-lg sm:text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">${price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded flex items-center gap-2 transition-all duration-200 hover:bg-blue-500 active:scale-95"
        disabled={loading}
      >
        {loading ? <ClipLoader size={20} color="#ffffff" /> : "Add to Cart"}
      </button>
      {feedbackMessage && (
        <div className="mt-2 text-green-600 text-sm transition-opacity duration-300 opacity-100">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
