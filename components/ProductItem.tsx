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
        <div className=" absolute bg-background rounded-full -bottom-4  border z-10 left-1/2 -translate-x-1/2 text-xs flex items-center justify-center gap-1 ">
          {isItemInCart(id) ? (
            <div className=" flex items-center justify-between min-w-[150px] px-4 py-2 ">
              <button onClick={() => decreaseItemQuantity(id)}>
                <CircleMinus size={16} />
              </button>
              <span>{getItemQuantity(id)}</span>
              <button onClick={() => increaseItemQuantity(id)}>
                <CirclePlus size={16} />
              </button>
            </div>
          ) : (
            <button
              className=" flex items-center justify-center gap-2 px-4 py-2 min-w-[150px]  "
              onClick={() => {
                addItemToCart(id);
              }}
            >
              <span>
                <ShoppingCart size={16} />
              </span>{" "}
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className=" mt-8 ">
        <p> {category}</p>
        <p className=" font-semibold ">{name}</p>

        <p className=" font-semibold text-primary "> ${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
