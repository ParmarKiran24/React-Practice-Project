import React from 'react';
import './styles.css';
import img from '../assets/Frame 153.png'

export default function NewsEvents(){
  return (
    <section className="news container">
      <h2 className="section-heading center white">News & Events</h2>

      <div className="news-grid full-news-layout">
        {/* Upcoming Events */}
        <div className="news-col">
          <h4>Upcoming Events</h4>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">21 minutes ago</p>
            <img src={img} alt="read-more" />
          </div>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">21 minutes ago</p>
            <img src={img} alt="read-more" />
          </div>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">on 25 July 2025</p>
            <img src={img} alt="read-more" />
          </div>

          <button className="btn-white wide">View More</button>
        </div>

        {/* News Updates */}
        <div className="news-col">
          <h4>News/ Updates</h4>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">21 minutes ago</p>
            <img src={img} alt="read-more" />
          </div>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">21 minutes ago</p>
            <img src={img} alt="read-more" />
          </div>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">on 25 July 2025</p>
            <img src={img} alt="read-more" />
          </div>

          <button className="btn-white wide">View More</button>
        </div>

        {/* Recruitment */}
        <div className="news-col">
          <h4>Recruitment</h4>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">21 minutes ago</p>
            <img src={img} alt="read-more" />
          </div>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">21 minutes ago</p>
            <img src={img} alt="read-more" />
          </div>

          <div className="news-item">
            <p className="news-title">City Council Approves New Public Park Development Project in Downtown Area</p>
            <p className="news-time">on 25 July 2025</p>
            <img src={img} alt="read-more" />
          </div>

          <button className="btn-white wide">View More</button>
        </div>
      </div>
    </section>
  );
}