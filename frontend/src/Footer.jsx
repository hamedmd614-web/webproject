// src/Footer.jsx
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* BRAND */}
        <div className="footer-section">
          <h3 className="footer-logo">SmartZone</h3>
          <p className="footer-text">
            Premium products with quality and trust.  
            Built with modern web technologies.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>Shipping & Delivery</li>
            <li>Returns Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: hamedmd614@gmail.com</p>
          <p>phone:8297860240</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} SmartZone. All rights reserved.
      </div>
    </footer>
  );
}
