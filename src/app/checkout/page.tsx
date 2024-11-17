"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // State to hold shipping and payment information
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  // State to hold form errors
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });

  // Loading and feedback state
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error message when user starts typing
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let errors = {
      fullName: "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required.";
      isValid = false;
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required.";
      isValid = false;
    }
    if (!formData.city.trim()) {
      errors.city = "City is required.";
      isValid = false;
    }
    if (!formData.zipCode.trim()) {
      errors.zipCode = "Zip Code is required.";
      isValid = false;
    }
    if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
      errors.phone = "Valid phone number is required.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      // Start loading
      setLoading(true);

      // Simulate an async operation (like sending data to a server)
      setTimeout(() => {
        // Stop loading
        setLoading(false);

        // Show success message
        setOrderSuccess("Order placed successfully! Thank you for shopping with us.");

        // Clear success message after a few seconds
        setTimeout(() => setOrderSuccess(null), 3000);
      }, 2000); // Simulating a 2-second delay
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

      {/* Cart Summary */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.quantity}`} className="flex justify-between p-4 bg-white rounded-lg shadow-md">
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-gray-800 font-bold">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping Information */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <form className="grid gap-6">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className={`p-3 border ${
              formErrors.fullName ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.fullName && <p className="text-red-600">{formErrors.fullName}</p>}
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className={`p-3 border ${
              formErrors.address ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.address && <p className="text-red-600">{formErrors.address}</p>}
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="City"
            className={`p-3 border ${
              formErrors.city ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.city && <p className="text-red-600">{formErrors.city}</p>}
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder="State"
            className="p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="Zip Code"
            className={`p-3 border ${
              formErrors.zipCode ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.zipCode && <p className="text-red-600">{formErrors.zipCode}</p>}
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className={`p-3 border ${
              formErrors.phone ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {formErrors.phone && <p className="text-red-600">{formErrors.phone}</p>}
        </form>
      </div>

      {/* Place Order Button */}
      <div className="text-center">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 text-white py-3 px-6 rounded text-lg flex items-center justify-center gap-2 transition-all duration-200 hover:bg-blue-500 active:scale-95"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "Place Order"}
        </button>
        {orderSuccess && <p className="mt-4 text-green-600">{orderSuccess}</p>}
      </div>
    </div>
  );
}
