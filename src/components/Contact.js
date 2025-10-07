import React from "react";

export const Contact = () => {
  return (
    <div className="pt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          We're here to help. Have questions about your order, feedback, or
          partnership inquiries? Reach out to us!
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send us a message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> support@foodify.com
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Phone:</strong> +91 98989 89898
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Address:</strong> 123, Foodie Street, Bangalore, India
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="text-orange-500 font-medium hover:underline"
            >
              Website
            </a>
            <a
              href="#"
              className="text-blue-600 font-medium hover:underline"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-blue-400 font-medium hover:underline"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-pink-500 font-medium hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
