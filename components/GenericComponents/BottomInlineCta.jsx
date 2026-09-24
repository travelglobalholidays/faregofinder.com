"use client";
import { CONTACT_INFO } from "@/config/ContactInfo";
import Image from "next/image";

const BottomInlineCTA = ({
  phoneNumber = CONTACT_INFO.phoneDisplayDashed,
  phoneHref = CONTACT_INFO.phoneHref,
  primaryBgClass = "bg-primary",
  textColorClass = "text-white",
}) => {
  return (
    <div className={`w-full py-4 px-4 ${primaryBgClass}`}>
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
        <span className="h-[45px] w-[45px] relative shrink-0">
          <Image
            src="/images/call-pullu-love.png"
            alt="Phone Ringing"
            fill
            className="animate-[trin_1.5s_linear_infinite] object-contain"
          />
        </span>

        <div className={`text-center font-medium ${textColorClass}`}>
          <p className="text-sm">Call For Flight Booking Assistance</p>
          <a
            href={phoneHref}
            className={`block font-bold text-3xl leading-tight ${textColorClass}`}
          >
            {phoneNumber}
          </a>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes trin {
          0%,
          20%,
          32%,
          44%,
          56%,
          68%,
          80% {
            transform: rotate(0deg);
          }
          23%,
          35%,
          47%,
          59%,
          71% {
            transform: rotate(15deg);
          }
          29%,
          41%,
          53%,
          65%,
          77% {
            transform: rotate(-15deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BottomInlineCTA;
