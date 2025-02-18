import React from 'react';
import './About.css';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About TenderManage</h1>
        <p>Streamlining the tender process for businesses worldwide</p>
      </header>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>At TenderManage, we're committed to simplifying the complex world of tender management. Our platform is designed to help businesses of all sizes efficiently create, submit, and manage tenders, saving time and resources while increasing success rates.</p>
      </section>

      <section className="about-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Efficiency</h3>
            <p>Streamline your tender process with our intuitive platform, reducing time and effort spent on administrative tasks.</p>
          </div>
          <div className="feature-item">
            <h3>Transparency</h3>
            <p>Gain clear insights into your tender status and progress with our comprehensive tracking and reporting tools.</p>
          </div>
          <div className="feature-item">
            <h3>Collaboration</h3>
            <p>Foster teamwork with our collaborative features, allowing seamless communication and document sharing among team members.</p>
          </div>
          <div className="feature-item">
            <h3>Compliance</h3>
            <p>Stay compliant with our up-to-date templates and checklists, ensuring your tenders meet all necessary requirements.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Our Story</h2>
        <p>Founded in 2020, TenderManage was born out of the frustration experienced by our founders in managing complex tender processes. We've since grown into a trusted platform used by thousands of businesses across various industries.</p>
      </section>

      <section className="about-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/placeholder.svg?height=100&width=100" alt="Jane Doe" className="team-member-image" />
            <h3>Jane Doe</h3>
            <p>CEO & Co-founder</p>
          </div>
          <div className="team-member">
            <img src="/placeholder.svg?height=100&width=100" alt="John Smith" className="team-member-image" />
            <h3>John Smith</h3>
            <p>CTO & Co-founder</p>
          </div>
          <div className="team-member">
            <img src="/placeholder.svg?height=100&width=100" alt="Emily Brown" className="team-member-image" />
            <h3>Emily Brown</h3>
            <p>Head of Customer Success</p>
          </div>
        </div>
      </section>

      <section className="about-section cta-section">
        <h2>Ready to streamline your tender management?</h2>
        <button className="cta-button">Get Started Today</button>
      </section>
    </div>
  );
};

export default About;