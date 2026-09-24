"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import {
  Phone,
  Home,
  Info,
  Plane,
  PhoneCall,
  Rss,
  Menu,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";

const MenuToggle = ({ toggle }) => (
  <button
    onClick={toggle}
    className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full bg-primary focus:outline-none"
    aria-label="Toggle menu"
    type="button"
  >
    <Menu className="w-6 h-6 text-white" />
  </button>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "About", path: "/about-us", icon: Info },
    { label: "Refund Policy", path: "/refund-policy", icon: ShieldCheck },
    { label: "Contact", path: "/contact-us", icon: PhoneCall },
    // { label: "FAQ", path: "/blogs", icon: HelpCircle },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 px-4 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-20">
            <Link
              href="/"
              aria-label="Go to home page"
              className="relative group flex-shrink-0"
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Image
                  src="/images/logo.png"
                  alt="FaresGoFinder Travel Logo"
                  width={180}
                  height={40}
                  priority
                  className="h-16 w-auto object-contain"
                />
              </motion.div>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden lg:flex items-center space-x-1 relative">
                {navItems.map(({ label, path, icon: Icon }) => (
                  <motion.div key={label} className="relative group">
                    <Link
                      href={path}
                      className={`flex items-center gap-2 px-5 py-3 text-[16px] font-semibold transition-all duration-300 ${
                        pathname === path
                          ? "text-primary font-bold"
                          : "text-gray-700 hover:text-primary"
                      }`}
                      aria-current={pathname === path ? "page" : undefined}
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </Link>

                    <span
                      className={`absolute bottom-0 left-0 h-[3px] bg-primary transition-all duration-500 ease-in-out w-0 group-hover:w-full rounded-full`}
                    ></span>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                className="hidden lg:block"
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={CONTACT_INFO.phoneHref}
                  className="flex items-center gap-3 px-6 py-3 text-gray-900 rounded-none hover:shadow-xl transition-all"
                  aria-label="Call 24/7 support"
                >
                  <div className="relative">
                    <Image
                      src="/images/customer-service.png"
                      alt="Customer Support"
                      width={35}
                      height={35}
                      className="h-11 w-auto object-contain animate-pulse"
                    />
                    <motion.span
                      className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-xl text-red-500">
                      {CONTACT_INFO.phoneDisplayDashed}
                    </div>
                    <div className="text-sm font-light uppercase">
                      24/7 Support - Call Now
                    </div>
                  </div>
                </Link>
              </motion.div>

              <div className="lg:hidden flex items-center gap-3">
                <MenuToggle toggle={() => toggleOpen()} />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => toggleOpen()}
            />

            {/* Dropdown Curtain Menu */}
            <motion.aside
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 180, damping: 25 }}
              className="fixed top-0 left-0 w-full bg-white shadow-xl z-50 overflow-y-auto rounded-b-3xl"
              role="dialog"
              aria-label="Mobile navigation menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-20 flex items-center justify-between px-6 border-b">
                <Image
                  src="/images/logo.png"
                  alt="FaresGoFinder Mobile Logo"
                  width={160}
                  height={50}
                  className="h-16 w-auto"
                />
                <button
                  onClick={() => toggleOpen()}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                  aria-label="Close menu"
                  type="button"
                >
                  ✕
                </button>
              </div>

              <nav className="p-6" role="menu">
                <ul className="space-y-4">
                  {navItems.map(({ label, path, icon: Icon }, idx) => (
                    <motion.li
                      key={label}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.05 * idx }}
                      role="none"
                    >
                      <Link
                        href={path}
                        onClick={() => toggleOpen()}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-semibold transition-all ${
                          pathname === path
                            ? "bg-blue-100 text-blue-600 font-bold"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:font-bold"
                        }`}
                        role="menuitem"
                      >
                        <Icon className="w-6 h-6" />
                        {label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
