import React from "react";
import "./styles.css";
import img from "../assets/image 2.png";
import i1 from "../assets/College.png";
import i2 from "../assets/content creation.png";
import i3 from "../assets/University Building.png";
import i4 from "../assets/Scholarship.png";

export default function Welcome() {
  const stats = [
  { number: 30, label: "Affiliated Universities", icon: i1 },
  { number: 30, label: "Total UG Programmes", icon: i2 },
  { number: 30, label: "Total PG Programmes", icon: i2 },
  { number: 30, label: "Diploma Courses", icon: i2 },
  { number: 30, label: "Affiliated Colleges", icon: i3 },
  { number: 30, label: "Affiliated Agri. Tech. School", icon: i3 },
  { number: 30, label: "Total Students", icon: i4 },
  { number: 30, label: "Research Stations", icon: "/icons/research.svg" },
  { number: 30, label: "Ph.D. Programmes", icon: "/icons/phd.svg" },
  { number: 30, label: "Constitutent Agri. Tech. School", icon: i3 },
];



  return (
    <section className="welcome container">
      {/* LEFT SIDE */}
      <div className="welcome-left">
        <p className="site-location">Mahatma Phule Krushi Vidyapeeth</p>

        <h1 className="hero-title">
          Student Lifecycle <br /> Management
        </h1>

        <div className="welcome-stats-list">
  {stats.map((item, index) => (
    <div className="welcome-stat-item" key={index}>
      <img src={item.icon} alt="" className="stat-icon" />
      <div className="stat-info">
        <span className="stat-number">{item.number}</span>
        <span className="stat-label">{item.label}</span>
      </div>
    </div>
  ))}
</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="welcome-right">
        <div className="hero-desc-wrapper">
          <p className="hero-desc">
            A comprehensive digital platform to manage every stage of a student's
            academic journey — from admission to graduation.
          </p>

          <div className="arrow-group">
            <button className="arrow-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2" fill="none" />
              </svg>
            </button>

            <button className="arrow-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" stroke="#fff" strokeWidth="2" fill="none" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-card">
          <img src={img} alt="Main Visual" />
        </div>
      </div>
    </section>
  );
}
