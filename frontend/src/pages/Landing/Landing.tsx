import React from 'react';
import { ROUTES } from '@/app/consts';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';

function Landing (){
  const features = [
    "Having trouble with shared expenses?",
    "Want to keep track of a trip's costs?",
    "Can't remember who lent whom money?",
    "Rather pay in crypto money?",
    "Want to save money with AI predictions on the best time to pay?"
  ];

  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Main Content */}
        <main className="main-content">
          {/* Left Column */}
          <div className="brand-section">
            <h1 className="brand-title" onClick={() => {navigate(ROUTES.MAIN) }}>
              Chain<span className="brand-underline">Split</span>
            </h1>
            <p className="brand-description">
              The new way to divide expenses between friends:
              <span className="highlight-text">through crypto</span>
            </p>
          </div>

          {/* Right Column */}
          <div className="features-section">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <p>
                  <span className="feature-text">{feature}</span>
                  <span className="project-tag"  onClick={() => {navigate(ROUTES.MAIN) }}>ChainSplit.</span>
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};


export { Landing };