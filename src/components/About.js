import React from "react";

const About = () => {
  return (
    <div className="pt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Foodify</h1>
        <p className="text-gray-600 text-lg">
          Welcome to our food delivery platform! We are committed to bringing you delicious meals from your favorite restaurants, right at your doorstep.
        </p>
      </div>

      {/* Content Sections */}
      <div className="space-y-10">
        <section className="bg-orange-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To make food ordering fast, convenient, and enjoyable for everyone. We aim to connect food lovers with restaurants seamlessly.
          </p>
        </section>

        <section className="bg-orange-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To become the most loved and trusted food delivery platform, offering a delightful experience to users and helping restaurants grow their business.
          </p>
        </section>

        <section className="bg-orange-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="text-gray-600">Email: <span className="font-medium">support@foodify.com</span></p>
          <p className="text-gray-600">Phone: <span className="font-medium">+91 98989 89898</span></p>
          <p className="text-gray-600">Address: <span className="font-medium">123, Foodie Street, Bangalore, India</span></p>
        </section>
      </div>
    </div>
  );
};

export default About;
