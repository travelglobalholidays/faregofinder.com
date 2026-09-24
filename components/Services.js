import Image from "next/image";
import { Card } from "./ui/card";

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8 px-4">
      <Card className="flex items-center gap-4 flex-col sm:flex-row px-5 py-6 text-center sm:text-left">
        <Image
          src="/images/affordable.jpg"
          width={80}
          height={80}
          alt="affordable"
        />
        <div>
          <h1 className="text-xl font-semibold mb-1 text-primary">
            Affordable Plans
          </h1>
          <p className="text-md text-gray-700">
            We provide cheap plans for both domestic and international
            locations.
          </p>
        </div>
      </Card>
      <Card className="flex items-center gap-4 flex-col sm:flex-row px-5 py-6 text-center sm:text-left">
        <Image src="/images/secure.jpg" width={80} height={80} alt="secure" />
        <div>
          <h1 className="text-xl font-semibold mb-1 text-primary">
            Safe and Secure
          </h1>
          <p className="text-md text-gray-700">
            Our website is fully safe and secure, with increased SSL encryption.
          </p>
        </div>
      </Card>
      <Card className="flex items-center gap-4 flex-col sm:flex-row px-5 py-6 text-center sm:text-left">
        <Image src="/images/support.jpg" width={80} height={80} alt="support" />
        <div>
          <h1 className="text-xl font-semibold mb-1 text-primary">
            24/7 Customer Service
          </h1>
          <p className="text-md text-gray-700">
            Our skilled crew works around the clock; you can reach us via email
            or phone.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Services;
