import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Swiggy Clone</h1>
        <p>
          Welcome to our food delivery platform! We are committed to bringing
          you delicious meals from your favorite restaurants, right at your
          doorstep.
        </p>
      </div>

      <div className="about-content">
        <section>
          <h2>Our Mission</h2>
          <p>
            To make food ordering fast, convenient, and enjoyable for everyone.
            We aim to connect food lovers with restaurants seamlessly.
          </p>
        </section>

        <section>
          <h2>Our Vision</h2>
          <p>
            To become the most loved and trusted food delivery platform, offering
            a delightful experience to users and helping restaurants grow their business.
          </p>
        </section>

        <section>
          <h2>Our Team</h2>
          <p>
            Our team is passionate about technology and food. We combine the
            best of both to bring you an exceptional experience.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Email: support@swiggyclone.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: 123, Foodie Street, Bangalore, India</p>
        </section>
      </div>
    </div>
  );
};

export default About;
