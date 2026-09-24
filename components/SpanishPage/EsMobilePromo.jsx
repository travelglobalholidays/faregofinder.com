"use client";
import { CONTACT_INFO } from "@/config/ContactInfo";
import Image from "next/image";
import MobileNavbar from "../Headers/MobileNavbar";

const EsMobilePromo = ({
  phoneNumber = CONTACT_INFO.phoneDisplayDashed,
  phoneHref = CONTACT_INFO.phoneHref,
  headingText = "Ofertas de vuelos baratos",
  primaryBgClass = "bg-primary",
  textColorClass = "text-white",
  buttonColorClass = "bg-primary",
}) => {
  return (
    <>
      {/* Fixed Top CTA */}
      <div
        className={`mobileCta fixed top-[104px] left-0 right-0 w-full py-3 px-4 z-[998] shadow-md md:hidden ${primaryBgClass}`}
      >
        <div className="ctaContent flex items-center justify-center gap-3 max-w-md mx-auto">
          <span className="h-[45px] w-[45px] relative">
            <Image
              src="/images/call-pullu-love.png"
              alt="Llamada Telefónica"
              fill
              className="animate-[trin_1.5s_linear_infinite] object-contain"
            />
          </span>
          <div className={`ctaText text-center font-medium ${textColorClass}`}>
            <p className="text-sm">
              Llame para ofertas exclusivas
            </p>
            <a
              href={phoneHref}
              className={`block font-bold text-3xl ${textColorClass}`}
            >
              {phoneNumber}
            </a>
          </div>
        </div>
      </div>

      {/* Main Mobile Section */}
      <section className="block md:hidden  px-3 bg-white shadow-md rounded mt-[80px] mb-[10px]">
      <MobileNavbar/>
        {/* Header */}
        <div
          className={`py-2 rounded mb-4 text-center font-semibold text-lg ${textColorClass} ${primaryBgClass}`}
        >
          {headingText}
        </div>

        <Image
          src="/images/Generic-Banner.png"
          alt="Boleto de Aerolínea"
          width={500}
          height={300}
          className="w-full mb-4"
        />

        <div className="grid grid-cols-2 gap-2 text-sm font-fira mb-4">
          {[
            "Nuevas Reservas",
            "Cambios",
            "Cancelaciones",
            "Servicio al Cliente",
            "Reembolsos",
            "Mejoras de Asiento",
          ].map((text, i) => (
            <a
              key={i}
              href={phoneHref}
              className={`py-2 rounded text-center text-white ${buttonColorClass}`}
            >
              {text}
            </a>
          ))}
        </div>

        <Image
          src="/images/airline-generic.png"
          alt="Avión"
          width={500}
          height={300}
          className="w-full mb-4"
        />

        <h5 className="font-semibold text-lg text-gray-900 mb-2 text-center">
          Reservas y Cambios por Teléfono
        </h5>

        <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-800 mb-3">
          <span>✅ Pago flexible</span>
          <span>✅ Garantía de mejor precio</span>
        </div>

        <div className="w-4/5 mx-auto h-1 bg-primary-red rounded-full mb-4" />

        <Image
          src="/images/calling-cus.png"
          alt="Agente"
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-full border-2 border-black mx-auto mb-2"
        />

        <p className="text-center font-semibold text-gray-900 mb-1">
          Sin espera – Llamada atendida en 5 segundos
        </p>

        <p className="text-center font-bold text-rose-600 animate-pulse">
          ¡Haga clic para llamar!
        </p>

        <div
          className={`text-white rounded-full px-5 py-3 flex flex-wrap items-center justify-center gap-3 mt-4 max-w-xs mx-auto ${buttonColorClass}`}
        >
         
          <div>
            <small className="block text-sm">
              Ofertas exclusivas solo por teléfono
            </small>
            <span className="text-xl text-center font-bold block">{phoneNumber}</span>
          </div>
        </div>

        <p className="text-center text-gray-800 font-semibold text-base mt-4 px-4">
          Llame a nuestro servicio al cliente de aerolíneas y ahorre hasta un
          60% en vuelos nacionales y hasta un 50% en vuelos internacionales.
        </p>
      </section>

      {/* Fixed Bottom CTA */}
      {/* <div
        className={`mobileCta fixed bottom-0 left-0 right-0 w-full py-3 px-4 z-[999999] shadow-md md:hidden ${primaryBgClass}`}
      >
        <div className="ctaContent flex items-center justify-center gap-3 max-w-md mx-auto">
          <span className="h-[45px] w-[45px] relative">
            <Image
              src="/images/call-pullu-love.png"
              alt="Llamada Telefónica"
              fill
              className="animate-[trin_1.5s_linear_infinite] object-contain"
            />
          </span>
          <div className={`ctaText text-center font-medium ${textColorClass}`}>
            <p className="text-sm">
              Llame y obtenga ofertas de vuelos no publicadas
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className={`block font-bold text-3xl ${textColorClass}`}
            >
              {phoneNumber}
            </a>
          </div>
        </div>
      </div> */}

      
    </>
  );
};

export default EsMobilePromo;
