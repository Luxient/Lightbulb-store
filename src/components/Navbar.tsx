"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Trigger animation when cart items change
  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimateCart(true);
      const timer = setTimeout(() => setAnimateCart(false), 500); // Animation duration

      return () => clearTimeout(timer);
    }
  }, [cartItems.length]);

  return (
    <nav className="bg-blue-600 text-white py-4 px-8 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Lightbulb Store
        </Link>
        {/* Hamburger Icon for Mobile */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
        {/* Links for Desktop */}
        <div className="hidden lg:flex gap-6 items-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/cart" className="hover:underline flex items-center">
            <FaShoppingCart
              className={`mr-2 transition-transform duration-300 ${
                animateCart ? "animate-bounce" : ""
              }`}
            />
            Cart ({cartCount})
          </Link>
          <Link href="/checkout" className="hover:underline">
            Checkout
          </Link>
        </div>
      </div>
      {/* Links for Mobile - Shown when Hamburger Menu is Open */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-blue-600 text-white flex flex-col items-start p-6 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <Link href="/" className="hover:underline mb-4" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link href="/products" className="hover:underline mb-4" onClick={() => setIsMenuOpen(false)}>
          Products
        </Link>
        <Link href="/cart" className="hover:underline flex items-center mb-4" onClick={() => setIsMenuOpen(false)}>
          <FaShoppingCart
            className={`mr-2 transition-transform duration-300 ${
              animateCart ? "animate-bounce" : ""
            }`}
          />
          Cart ({cartCount})
        </Link>
        <Link href="/checkout" className="hover:underline mb-4" onClick={() => setIsMenuOpen(false)}>
          Checkout
        </Link>
      </div>
    </nav>
  );
}
