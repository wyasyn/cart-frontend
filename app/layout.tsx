import type { Metadata } from "next";
import { Red_Hat_Text as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import CartProvider from "@/context/provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Advanced Cart Management System with React - E-commerce Solution",
  description:
    "Develop a feature-rich cart management system using React. Includes functionalities for adding, removing, and updating cart items, order confirmation, and price calculations. Perfect for modern e-commerce applications",
  keywords:
    "React cart management system, e-commerce cart, add to cart functionality, remove from cart, update cart items, order confirmation, price calculation, React e-commerce solution",
  icons: {
    icon: "/assets/images/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
