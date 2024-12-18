import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "../components/ProductCard"; // Import ProductCard component

export const metadata: Metadata = {
  title: "Home - Lightbulb Store",
  description: "Welcome to Lightbulb Store - Discover the best light bulbs to brighten up every corner of your home.",
};

export default function Home() {
  const products = [
    { id: 1, name: "LED Light Bulb", price: 5.99, image: "/images/led-lightbulb.jpg" },
    { id: 2, name: "Halogen Light Bulb", price: 3.99, image: "/images/halogen-lightbulb.jpg" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <main className="flex flex-col items-center gap-8 p-8 pb-20 sm:p-20">
          {/* Hero Section */}
          <section className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 sm:p-10 rounded-lg shadow-md text-center transition-transform duration-300 transform hover:scale-105">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
              Welcome to Lightbulb Store!
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-medium">
              Discover the best light bulbs to brighten up every corner of your home.
            </p>
          </section>

          {/* Featured Products Section */}
          <section className="mt-16 w-full mb-24">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto text-center flex flex-col items-center gap-6">
          <p className="text-lg font-semibold mb-4">
            Need help? Email us at{" "}
            <Link
              href="mailto:support@lightbulbstore.com"
              className="underline hover:text-blue-300 transition-colors duration-300"
            >
              support@lightbulbstore.com
            </Link>
          </p>
          <div className="flex justify-center gap-8 mb-4 text-2xl">
            <Link href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors duration-300">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors duration-300">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors duration-300">
              <i className="fab fa-twitter"></i>
            </Link>
          </div>
          <nav className="flex gap-6 text-lg">
            <Link href="/" className="hover:underline hover:text-blue-300 transition-colors duration-300">
              Home
            </Link>
            <Link href="/products" className="hover:underline hover:text-blue-300 transition-colors duration-300">
              Products
            </Link>
            <Link href="/cart" className="hover:underline hover:text-blue-300 transition-colors duration-300">
              Cart
            </Link>
            <Link href="/checkout" className="hover:underline hover:text-blue-300 transition-colors duration-300">
              Checkout
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
