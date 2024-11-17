"use client";

import ProductCard from "../../components/ProductCard";

const products = [
  { id: 1, name: "LED Light Bulb", price: 5.99, image: "/images/led-bulb.jpg" },
  { id: 2, name: "Halogen Light Bulb", price: 3.99, image: "/images/halogen-bulb.jpg" },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
