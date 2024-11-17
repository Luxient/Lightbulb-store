"use client"; // Add this directive at the very top to mark it as a Client Component

import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Removed the metadata export since it’s not allowed in a client component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the entire application with the Redux Provider */}
        <Provider store={store}>
          <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Always at the top */}
            <main className="flex-grow">{children}</main> {/* Main content takes up the remaining space */}
            <Footer /> {/* Always at the bottom */}
          </div>
        </Provider>
      </body>
    </html>
  );
}
