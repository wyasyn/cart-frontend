"use client";

import { useData } from "@/context/data";
import { CircleX } from "lucide-react";
import Image from "next/image";

export default function CartComponent() {
  const {
    cart,
    removeItemFromCart,
    confirmOrder,
    resetOrder,
    showOrderConfirmation,
    totalPrice,
    totalQuantity,
  } = useData();

  return (
    <div className=" bg-secondary h-fit p-8 rounded-xl min-w-[350px] ">
      <h1 className=" text-2xl font-semibold tracking-wide mb-5 ">
        Your Cart ({totalQuantity}){" "}
      </h1>

      {totalQuantity > 0 ? (
        <div className=" flex gap-8 flex-col ">
          <ul className=" flex flex-col gap-4 ">
            {cart.map((item) => (
              <li key={item.id} className=" flex flex-col gap-1 ">
                <h3>{item.name}</h3>
                <div className=" flex items-center justify-between gap-3 ">
                  <div className=" flex items-center gap-4 ">
                    <span className=" font-medium ">{item.quantity}x</span>
                    <span>@ {item.price.toFixed(2)}</span>
                    <span>$ {item.subtotal.toFixed(2)}</span>
                  </div>
                  <button
                    className=" hover:text-foreground duration-300 ease-in-out "
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    <CircleX size={16} />{" "}
                    <span className=" sr-only ">Remove item</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className=" flex items-center justify-between gap-4 ">
            <p>Order Total</p>
            <div className=" text-2xl font-semibold text-foreground mt-2 ">
              ${totalPrice.toFixed(2)}
            </div>
          </div>
          <div className=" flex flex-col gap-3 mt-8 ">
            <div className=" flex gap-2 items-center justify-center ">
              <Image
                src="/assets/images/icon-carbon-neutral.svg"
                width={20}
                height={20}
                alt="carbon neutral"
              />
              <p>
                This is a <span className=" font-medium ">carbon-neutral</span>{" "}
                delivery
              </p>
            </div>
          </div>
          <button
            onClick={confirmOrder}
            className=" bg-primary text-primary-foreground py-2 rounded-full font-semibold "
          >
            Confirm Order
          </button>
        </div>
      ) : (
        <div className=" flex items-center flex-col gap-2 ">
          <Image
            src="/assets/images/illustration-empty-cart.svg"
            alt="empty cart"
            width={200}
            height={200}
          />
          <p>Your added items will appear here</p>
        </div>
      )}

      {showOrderConfirmation && (
        <>
          <div className=" fixed inset-0 bg-black/35 z-20 backdrop-blur-sm " />
          <div className=" z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-8 rounded-xl shadow-md flex flex-col gap-6 min-w-[350px] ">
            <Image
              src="/assets/images/icon-order-confirmed.svg"
              width={32}
              height={32}
              alt="tick"
            />
            <div>
              <h2 className=" font-bold text-2xl text-foreground ">
                Order Confirmed
              </h2>
              <p>We hope you enjoy your food!</p>
            </div>
            <ul className=" flex flex-col gap-4 ">
              {cart.map((item) => (
                <li key={item.id} className=" flex flex-col gap-1 ">
                  <div className=" flex items-center justify-between gap-3 ">
                    <div className=" flex items-center gap-4 ">
                      <Image
                        src={item.image}
                        width={80}
                        height={80}
                        alt={item.name}
                        className=" rounded-lg "
                      />
                      <div>
                        <h3 className=" text-foreground font-semibold ">
                          {item.name}
                        </h3>
                        <div className=" flex items-end gap-3 ">
                          <span className=" font-medium ">
                            {item.quantity}x
                          </span>
                          <span>@ {item.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    <div className=" text-foreground font-medium ">
                      $ {item.subtotal.toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className=" flex items-center justify-between gap-4 ">
              <p>Order Total</p>
              <div className=" text-2xl font-semibold text-foreground mt-2 ">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
            <button
              className=" bg-primary py-2 flex items-center justify-center rounded-full text-background "
              onClick={resetOrder}
            >
              Start New Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
