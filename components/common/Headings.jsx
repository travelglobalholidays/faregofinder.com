import { FaPlane } from "react-icons/fa";

export default function SectionHeading({
  tagline = "About Us",
  title = "We Are The World",
  highlight = "",
  suffix = "",
  showDivider = true,
  icon: Icon = FaPlane,
}) {
  return (
    <div className="relative mb-6">
      {/* TAGLINE */}
      <span
        className="
          inline-flex items-center
          uppercase tracking-[3px]
          text-[16px] font-semibold
          text-white
          bg-theme
          rounded-full
          px-3 py-[5px]
        "
      >
        {/* ICON */}
        {Icon && (
          <span
            className="
              flex items-center justify-center
              w-[30px] h-[30px]
              rounded-full
              bg-white text-theme
              text-[16px]
              relative
              left-[-15px]
            "
          >
            <Icon />
          </span>
        )}

        {tagline}
      </span>

      {/* TITLE */}
      <h2
        className="
          mt-2
          text-[32px]
          font-semibold
          leading-tight
          capitalize
          text-dark
        "
      >
        {title} <span className="text-theme">{highlight}</span> {suffix}
      </h2>

      {/* DIVIDER */}
      {showDivider && (
        <div className="mt-4">
          <span className="heading-divider"></span>
        </div>
      )}
    </div>
  );
}
