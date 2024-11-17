"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { updateQuantity, removeItem } from "../../features/cartSlice";
import Link from "next/link";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem({ id }));
  };

  return (
    <div className="container mx-auto p-6 sm:p-10">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6 mb-10">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.quantity}`} // Ensure a unique key
                className="flex flex-col sm:flex-row items-center justify-between p-6 bg-white rounded-lg shadow-md gap-4"
              >
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-green-500 text-white py-1 px-3 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-gray-700 text-white py-2 px-4 rounded mt-4 sm:mt-0"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Proceed to Checkout Button */}
          <div className="text-center">
            <Link href="/checkout">
              <button className="bg-green-600 text-white py-3 px-6 rounded text-lg">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
