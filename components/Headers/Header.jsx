"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TopBar from "./TopBar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full z-[999]">
      <TopBar />
      <Navbar scrolled={scrolled} />
    </header>
  );
}
