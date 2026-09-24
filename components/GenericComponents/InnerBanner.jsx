import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function InnerBanner({
  title,
  breadcrumbs = [{ label: "Home", href: "/" }],
}) {
  return (
    <section className="bg-dark text-white">
      <div className="mx-auto flex min-h-[190px] max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/75"
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-theme2" : ""}>{item.label}</span>
                )}
                {!isLast && <ChevronRight className="h-4 w-4" />}
              </span>
            );
          })}
        </nav>

        <h1 className="font-heading text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </div>
    </section>
  );
}
