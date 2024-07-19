import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className=" grid place-items-center min-h-dvh ">
      <div className=" flex flex-col gap-4 items-center ">
        <Image
          width={350}
          height={350}
          alt="not found page"
          src="/assets/images/page-not-found.svg"
        />
        <p>Could not find requested resource</p>
        <Link href="/" className=" underline ">
          Return Home
        </Link>
      </div>
    </div>
  );
}
