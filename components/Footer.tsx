import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-10 text-center">
      <p>
        Developed by{" "}
        <Link
          href="https://ywalum.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" text-primary underline "
        >
          Yasin Walum
        </Link>
        {"  "}
        Challenge by{" "}
        <Link
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noopener noreferrer"
          className=" underline text-primary "
        >
          Frontend Mentor
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
