"use client";

import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BookingAccess({ children }) {
  const { loading, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", pathname);
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, isAuthenticated, pathname, router]);
  if (loading || !isAuthenticated) return <div role="status" className="flex min-h-[60vh] items-center justify-center text-theme">Loading your booking...</div>;
  return children;
}
