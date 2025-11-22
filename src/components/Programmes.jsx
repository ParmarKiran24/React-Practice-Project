import React, { useState } from "react";
import "./styles.css";

export default function Programmes() {
  const tabs = ["Diploma Programmes", "UG Programmes", "PG Programmes", "PHD Programmes"];
  
  // use null for no active tab (so clicking same tab resets it)
  const [active, setActive] = useState(0);

  const handleTabClick = (index) => {
    if (active === index) {
      setActive(null); // clicking same tab → unselect
    } else {
      setActive(index); // clicking new tab → activate
    }
  };

  return (
    <section className="programmes container">
      {/* Tabs */}
      <div className="programme-tabs">
        {tabs.map((t, i) => (
          <button
            key={i}
            className={`programme-tab ${active === i ? "active" : ""}`}
            onClick={() => handleTabClick(i)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="programme-card-wrapper">
        <div className="programme-card">
          <h3>Diploma in Agriculture Course</h3>

          <p className="card-title">Course Overview:</p>
          <p className="card-desc">
            The "Diploma in Agriculture" is a diploma-level programme aimed at
            training students in various aspects of agriculture.
          </p>

          <p className="card-title">Course Duration: <span>2 Years</span></p>

          <p className="card-title">Eligibility Criteria:</p>
          <ul>
            <li>10th pass (or equivalent)</li>
            <li>Minimum aggregate marks (e.g., 50%)</li>
          </ul>

          <button className="info-btn">View Course Information</button>
        </div>

        <div className="programme-card">
          <h3>Diploma in Agriculture Course</h3>

          <p className="card-title">Course Overview:</p>
          <p className="card-desc">
            The “Polytechnic in Agriculture” is a diploma-level programme aimed 
            at training students in crop science, horticulture, soil science, etc.
          </p>

          <p className="card-title">Course Duration: <span>3 Years</span></p>

          <p className="card-title">Eligibility Criteria:</p>
          <ul>
            <li>10th standard (SSC) or equivalent</li>
            <li>Minimum aggregate marks (e.g., 50%)</li>
          </ul>

          <button className="info-btn">View Course Information</button>
        </div>

        <div className="programme-card">
          <h3>Diploma in Agriculture Course</h3>

          <p className="card-title">Course Overview:</p>
          <p className="card-desc">
            Provides skill-oriented horticulture training for gardeners,
            nursery workers & agriculture landscape workers.
          </p>

          <p className="card-title">Course Duration: <span>1 Year</span></p>

          <p className="card-title">Eligibility Criteria:</p>
          <ul>
            <li>8th class pass</li>
          </ul>

          <button className="info-btn-3">View Course Information</button>
        </div>
      </div>
    </section>
  );
}
