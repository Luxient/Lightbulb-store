import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Import icons from react-icons

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 md:px-0 flex flex-col items-center text-center gap-6">
        {/* Company Information */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold">Lightbulb Store</h4>
          <p className="text-sm">Bringing brightness to your home.</p>
        </div>

        {/* Navigation Links
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/about" className="hover:text-blue-400 text-sm">
            About Us
          </Link>
          <Link href="/products" className="hover:text-blue-400 text-sm">
            Products
          </Link>
          <Link href="/contact" className="hover:text-blue-400 text-sm">
            Contact
          </Link>
        </div> */}

        {/* Social Media Links */}
        <div className="flex gap-4 mt-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 text-sm flex items-center gap-1"
          >
            <FaFacebook size={20} /> Facebook
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 text-sm flex items-center gap-1"
          >
            <FaInstagram size={20} /> Instagram
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 text-sm flex items-center gap-1"
          >
            <FaTwitter size={20} /> Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
