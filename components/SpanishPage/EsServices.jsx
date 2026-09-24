import Image from "next/image";
import { Card } from "../ui/card";


const EsServices = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-10 px-4">
      <Card className="flex items-center gap-4 flex-col sm:flex-row px-5 py-6 text-center sm:text-left">
        <Image
          src="/images/affordable.jpg"
          width={80}
          height={80}
          alt="planes accesibles"
        />
        <div>
          <h1 className="text-xl font-semibold mb-1 text-primary">
            Planes Accesibles
          </h1>
          <p className="text-md text-gray-700">
            Ofrecemos planes económicos para destinos nacionales e
            internacionales.
          </p>
        </div>
      </Card>

      <Card className="flex items-center gap-4 flex-col sm:flex-row px-5 py-6 text-center sm:text-left">
        <Image
          src="/images/secure.jpg"
          width={80}
          height={80}
          alt="seguro"
        />
        <div>
          <h1 className="text-xl font-semibold mb-1 text-primary">
            Seguro y Confiable
          </h1>
          <p className="text-md text-gray-700">
            Nuestro sitio web es totalmente seguro y cuenta con cifrado SSL
            avanzado para proteger su información.
          </p>
        </div>
      </Card>

      <Card className="flex items-center gap-4 flex-col sm:flex-row px-5 py-6 text-center sm:text-left">
        <Image
          src="/images/support.jpg"
          width={80}
          height={80}
          alt="soporte"
        />
        <div>
          <h1 className="text-xl font-semibold mb-1 text-primary">
            Atención al Cliente 24/7
          </h1>
          <p className="text-md text-gray-700">
            Nuestro equipo especializado está disponible las 24 horas para
            ayudarle por teléfono o correo electrónico.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default EsServices;
