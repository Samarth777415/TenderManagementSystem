import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Streamline Your Tender Management</h1>
          <p>Efficiently manage your tenders, from creation to completion, all in one secure and intuitive platform.</p>
          <div className="button-group">
            <Link to="/signup" className="cta-button">Get Started</Link>
            <button className="secondary-button">Request Demo</button>
          </div>
        </div>
      </section>
      <section className="features-section">
        <h2>Features</h2>
        <div className="features">
          <div className="feature-item">
            <i className="fas fa-file-alt"></i>
            <h3>Easy Tender Creation</h3>
            <p>Create tenders with a simple and intuitive interface.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-lock"></i>
            <h3>Secure Management</h3>
            <p>Keep your documents safe with our secure storage.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-users"></i>
            <h3>Collaborate in Real-time</h3>
            <p>Work together with your team to manage tenders efficiently.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Create or Find Tenders</h3>
            <p>Start by creating or searching for open tenders that match your needs.</p>
          </div>
          <div className="step">
            <h3>2. Submit Proposals</h3>
            <p>Easily submit your proposals for tenders.</p>
          </div>
          <div className="step">
            <h3>3. Compare and Select</h3>
            <p>Compare submissions and select the best offers.</p>
          </div>
          <div className="step">
            <h3>4. Award and Manage</h3>
            <p>Finalize the process by awarding and managing the contract.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials">
          <div className="testimonial-item">
            <p>"This platform has transformed how we manage tenders."</p>
            <h4>John Doe, Company Inc.</h4>
          </div>
          <div className="testimonial-item">
            <p>"Efficient and easy to use, highly recommend!"</p>
            <h4>Jane Smith, Business Co.</h4>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Tender Management App. All rights reserved.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
