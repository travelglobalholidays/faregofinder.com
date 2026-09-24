import Image from "next/image";
import SectionHeading from "./common/Headings";

const chooseData = [
  {
    count: "01",
    title: "Safety And Trust",
    desc: "FaresGoFinder provides clear booking support, transparent fare information, and reliable assistance so every trip is planned with confidence.",
    icon: "/images/icons/safety.svg",
  },
  {
    count: "02",
    title: "100% Price Transparency",
    desc: "We provide clear and honest pricing with no hidden charges, giving you full clarity before confirming your booking.",
    icon: "/images/icons/price.svg",
  },
  {
    count: "03",
    title: "Travel With More Confidence",
    desc: "Expert guidance, flexible options, and real-time assistance help you book flights smoothly and without stress.",
    icon: "/images/icons/booking-confirm.svg",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-[120px] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-xl">
          <SectionHeading
            tagline="  Why Choose Us"
            title="Discover Beautiful "
            highlight="Place With Us"
            suffix=""
          />
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            {chooseData.map((item) => (
              <div
                key={item.count}
                className="
                  relative flex gap-4 items-start
                  bg-white shadow-lg
                  p-5 mb-8
                  rounded-[100px_100px_100px_0]
                  transition-transform duration-300
                  hover:translate-y-1
                "
              >
                {/* COUNT */}
                <span className="absolute -top-2 left-3 text-xs font-semibold text-white bg-theme2 px-3 py-1 rounded-full shadow">
                  {item.count}
                </span>

                {/* ICON */}
                <div className="w-[80px] h-[80px] flex items-center justify-center bg-theme rounded-full shrink-0">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="invert brightness-0"
                  />
                </div>

                {/* TEXT */}
                <div>
                  <h4 className="text-[20px] font-semibold text-dark mb-1">
                    {item.title}
                  </h4>
                  <p className="text-body text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative text-right">
            <Image
              src="/images/shape/plane.png"
              alt="shape"
              width={300}
              height={300}
              className="absolute top-[-15px] left-[70px] w-[35%]"
            />

            <Image
              src="/images/choose/choose-1.jpg"
              alt="choose-1"
              width={450}
              height={600}
              className="inline-block w-[58%] rounded-[200px]"
            />

            <Image
              src="/images/choose/choose-2.jpg"
              alt="choose-2"
              width={400}
              height={500}
              className="
                absolute left-[50px] bottom-0
                w-[50%]
                rounded-[200px]
                border-[10px] border-white
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
