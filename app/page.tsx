"use client";

import React, { useState } from "react";
import products from "@/constants/data.json"; // Adjust the path as necessary

import CartComponent from "@/components/cart";
import { ModeToggle } from "@/components/modeToggle";
import ProductItem from "@/components/ProductItem";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
}

const categories = Array.from(
  new Set(products.map((product: Product) => product.category))
);

const ProductList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product: Product) => product.category === selectedCategory
        );

  return (
    <>
      <main className=" container flex flex-col gap-10 lg:flex-row py-12 ">
        <div className=" md:flex-1 ">
          <div className=" flex gap-10 items-end justify-between ">
            <h1 className=" font-bold text-foreground text-3xl lg:text-4xl ">
              Desserts
            </h1>{" "}
            <ModeToggle />
          </div>

          <div className=" flex items-end justify-start gap-2 flex-wrap py-8 ">
            <button
              className={` hover:text-foreground duration-300 ease-in-out px-2 py-1  
              ${
                selectedCategory === "All"
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                className={` hover:text-foreground duration-300 ease-in-out px-2 py-1  
              ${
                selectedCategory === category
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              }`}
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className=" grid custom-grid gap-8 ">
            {filteredProducts.map((product) => (
              <ProductItem
                id={product.id}
                key={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                category={product.category}
              />
            ))}
          </div>
        </div>
        <CartComponent />
      </main>
      <Footer />
    </>
  );
};

export default ProductList;
