"use client";

import { useState } from "react";
import { PhoneCall, Mail, MapPin, CheckCircle } from "lucide-react";
import { CONTACT_INFO } from "@/config/ContactInfo";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  return (
    <>
      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-[#f7f7f7] p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-primary font-heading">
              Get in Touch
            </h2>
            <div className="space-y-5 text-gray-700 text-base">
              <div className="flex items-start gap-3">
                <PhoneCall className="text-primary" />
                <span>
                  <strong>Phone:</strong>{" "}
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="text-primary hover:underline"
                  >
                    {CONTACT_INFO.phoneDisplayDashed}
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-primary" />
                <span>
                  <strong>Email:</strong>{" "}
                  <a
                    href={CONTACT_INFO.emailHref}
                    className="text-primary hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-primary" />
                <span>
                  <strong>Office:</strong> <br />
                 73-41 71 PLACE GLENDALE, NY 11385
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary text-white p-6 rounded-2xl shadow-md">
            <p>
              Prefer to speak with someone directly?{" "}
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-secondary font-semibold hover:underline"
              >
                Call our travel advisors now
              </a>{" "}
              for immediate assistance.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-primary font-heading">
            Send a Message
          </h2>
          {submitted ? (
            <div className="flex items-start gap-3 text-green-600 bg-green-50 p-4 rounded-md">
              <CheckCircle className="mt-1" />
              <span>
                Your message has been submitted! For quicker assistance,{" "}
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="text-primary font-semibold underline hover:text-primary"
                >
                  call our 24/7 team now.
                </a>
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block mb-1 font-medium text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-800">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows="4"
                  className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white font-semibold px-6 py-2 rounded hover:bg-[#ff0022] transition-all"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Embedded Map */}
      {/* <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.680848117061!2d-70.78660722357215!3d43.09020467113446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e2bfb7107f7907%3A0xbcdbb08159793b59!2s211%20Commerce%20Way%2C%20Portsmouth%2C%20NH%2003801%2C%20USA!5e0!3m2!1sen!2sin!4v1759580612702!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-md"
        ></iframe>
      </div> */}
    </>
  );
}
