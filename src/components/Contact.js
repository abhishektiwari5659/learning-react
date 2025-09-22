

export const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We're here to help. Have questions about your order, feedback, or
          partnership inquiries? Reach out to us!
        </p>
      </div>

      <div className="contact-content">
        
        <div className="contact-form">
          <h2>Send us a message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>

       
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p><strong>Email:</strong> support@swiggyclone.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 123, Foodie Street, Bangalore, India</p>

          <div className="social-links">
            <a href="#"> Website</a>
            <a href="#"> Facebook</a>
            <a href="#"> Twitter</a>
            <a href="#"> Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}
