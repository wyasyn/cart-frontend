"use client"; // Error components must be Client Components

import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className=" grid place-items-center min-h-dvh ">
      <div className=" flex flex-col gap-4 items-center ">
        <Image
          src="/assets/images/error-page.svg"
          width={350}
          height={350}
          alt="error page"
          className=" object-cover "
        />
        <h2 className=" text-2xl font-semibold text-primary ">
          Something went wrong!
        </h2>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    </div>
  );
}
