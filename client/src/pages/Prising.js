import React from 'react';
import './Prising.css';
import { useEffect } from 'react';
const Prising = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      features: [
        'Up to 10 tenders per month',
        'Basic analytics',
        'Email support',
        '1 user account'
      ],
      recommended: false
    },
    {
      name: 'Pro',
      price: '$79',
      features: [
        'Up to 50 tenders per month',
        'Advanced analytics',
        'Priority email support',
        '5 user accounts',
        'Custom branding'
      ],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Unlimited tenders',
        'Full analytics suite',
        '24/7 phone & email support',
        'Unlimited user accounts',
        'Custom branding',
        'API access'
      ],
      recommended: false
    }
  ];

  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Choose Your Plan</h1>
      <p className="pricing-subtitle">Select the perfect plan for your tender management needs</p>
      <div className="pricing-plans">
        {plans.map((plan, index) => (
          <div key={index} className={`pricing-plan ${plan.recommended ? 'recommended' : ''}`}>
            {plan.recommended && <div className="recommended-badge">Recommended</div>}
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-price">{plan.price}<span className="price-period">/month</span></p>
            <ul className="plan-features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <button className="select-plan-btn">
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prising;