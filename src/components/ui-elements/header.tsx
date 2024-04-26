import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-5 border-b flex-none">
      <Link href="/" className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="logo.webp" alt="RhyzMel" width={50} height={50} />
        <p>RhyzMel</p>
      </Link>
      <Link href="/app">
        <p>Get Started</p>
      </Link>
    </header>
  );
}
