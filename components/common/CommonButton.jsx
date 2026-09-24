import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function CommonButton({
  href = "#",
  text = "Call Now",
  icon: Icon = FaArrowRight,
  className = "",
}) {
  return (
    <Link
      href={href}
      className={`
        relative flex items-center justify-center gap-2
        h-[56px] w-[220px]
        overflow-hidden rounded-full
        bg-theme text-white

        shadow-theme
        transition-theme

        before:absolute
        before:h-0 before:w-0
        before:rounded-full
        before:bg-[var(--theme-color2)]
        before:duration-500 before:ease-out

        hover:before:h-[280px]
        hover:before:w-[280px]
        hover:shadow-[var(--theme-color2)]

        ${className}
      `}
    >
      {/* CONTENT */}
      <span className="relative z-10 flex items-center gap-2 text-[16px] font-[500] tracking-wide">
        {text}
        {Icon && <Icon className="text-sm" />}
      </span>
    </Link>
  );
}
