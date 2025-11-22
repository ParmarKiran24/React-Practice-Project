import React from 'react';
import './styles.css';

export default function Footer(){
  return (
    <footer className="site-footer">
      {/* Top Social + Logo Bar */}
      <div className="footer-topbar">
        <div className="footer-top-left">
          <img src="/mnt/data/bb96628e-2d62-4fff-9fb3-a020a0e59519.png" alt="logo" className="footer-logo" />
          <span className="footer-top-title">VNMKV Student Portal</span>
        </div>
        <div className="footer-top-right">
          <img src="/mnt/data/0dd925ab-ad84-4113-887f-eb04cf0a5f6d.png" alt="social-icons" className="footer-social" />
        </div>
      </div>

      <div className="container footer-wrapper">
        <div className="footer-col">
          <h4 className="footer-heading">Contact Us</h4>
          <p className="footer-text">Mahatma Phule Krishi Vidyapeeth,<br/>Rahuri,<br/>Ahilyanagar, Maharashtra - 413722</p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Important Links</h4>
          <ul className="footer-links">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Disclaimer</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Helpdesk</h4>
          <p className="footer-text">Phone : +91-9823009846<br/>Timing : 10:00 am to 6:00 pm (All Days)</p>
        </div>
      </div>

      <p className="footer-center-title">MPKV Student Portal</p>

      <div className="footer-bottom">
        <p>MPKV, Rahuri. All Rights Reserved.</p>
        <p>Designed, Developed and Hosted by Analytica Business Solutions (ABS)</p>
      </div>
    </footer>
  );
}