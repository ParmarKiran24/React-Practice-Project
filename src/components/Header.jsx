import React from "react";
import './styles.css'
import img from '../assets/image 4.png'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <div className="logo" ><img src={img} alt="header-logo" /></div>
          <div className="site-name">MPKV Student Portal</div>
        </div>

        <div className="actions">
          <button className="link-btn">Login</button>
          <button className="btn-primary">Register</button>
        </div>
      </div>
    </header>
  );
}
