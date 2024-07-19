"use client";

import { useData } from "@/context/data";
import { CircleMinus, CirclePlus, ShoppingCart } from "lucide-react";
import Image from "next/image";
interface ImageProp {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export default function ProductItem({
  id,
  name,
  category,
  price,
  image,
}: {
  id: string;
  name: string;
  category: string;
  price: number;
  image: ImageProp;
}) {
  const {
    addItemToCart,
    isItemInCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    getItemQuantity,
  } = useData();
  return (
    <div>
      <div className=" relative w-full aspect-square ">
        <Image
          src={image.mobile}
          alt={name}
          fill
          className={` object-cover rounded-lg md:hidden ${
            isItemInCart(id) && "border-2 border-primary"
          } `}
        />
        <Image
          src={image.tablet}
          alt={name}
          fill
          className={` object-cover rounded-lg hidden md:block lg:hidden ${
            isItemInCart(id) && "border-2 border-primary"
          }`}
        />
        <Image
          src={image.desktop}
          alt={name}
          fill
          className={`object-cover rounded-lg hidden lg:block ${
            isItemInCart(id) && "border-2 border-primary"
          } `}
        />
        <div className=" absolute bg-background rounded-full -bottom-4 z-10 left-1/2 -translate-x-1/2 text-xs flex items-center justify-center gap-1 ">
          {isItemInCart(id) ? (
            <div className=" flex items-center justify-between min-w-[150px] px-4 py-2 bg-primary border rounded-full text-secondary ">
              <button
                className=" hover:scale-110 duration-300 ease-in-out "
                onClick={() => decreaseItemQuantity(id)}
              >
                <CircleMinus size={16} />
              </button>
              <span className=" font-semibold ">{getItemQuantity(id)}</span>
              <button
                className=" hover:scale-110 duration-300 ease-in-out "
                onClick={() => increaseItemQuantity(id)}
              >
                <CirclePlus size={16} />
              </button>
            </div>
          ) : (
            <button
              className=" border rounded-full flex items-center justify-center gap-2 px-4 py-2 min-w-[150px] hover:text-primary hover:border-primary duration-300 ease-in-out text-foreground font-semibold   "
              onClick={() => {
                addItemToCart(id);
              }}
            >
              <span className=" text-primary ">
                <ShoppingCart size={16} />
              </span>{" "}
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className=" mt-8 ">
        <p> {category}</p>
        <p className=" font-semibold text-foreground ">{name}</p>

        <p className=" font-semibold text-primary "> ${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
