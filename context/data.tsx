"use client";
import { useContext } from "react";
import { CartContext } from "./provider";

export const useData = () => {
  const context = useContext(CartContext);

  if (context === undefined)
    throw new Error("useData must be used within a ThemeProvider");

  return context;
};
