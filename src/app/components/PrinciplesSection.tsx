import React from 'react';
import './PrinciplesSection.css';

const PRINCIPLES = [
  {
    title: 'Quality',
    description:
      'Quality and performance never happen by chance; they define every action we take. After all, excellence is the only thing that guarantees our long-term success.',
  },
  {
    title: 'Integrity',
    description:
      "We believe that strong moral principles must exist in any field of activity, and the quality of being honest and open with clients and potential clients defines us as a company.",
  },
  {
    title: 'The right price',
    description:
      'We pride ourselves on our ability to estimate and budget the services we provide, which we consider fair. You will not pay a little or a lot, cheap or expensive, but exactly what it is worth.',
  },
  {
    title: 'Innovation',
    description:
      "It's clear that innovation is part of our DNA. At TAG Unlimited Clothing, we believe that success belongs to the brave, which is why we are not afraid to implement visionary ideas from the future.",
  },
];

export const PrinciplesSection = React.memo(function PrinciplesSection() {
  return (
    <section id="principles" className="principles-section" aria-labelledby="principles-heading">
      <header className="principles-header">
        <h2 id="principles-heading" className="principles-title">
          <span className="principles-title-accent">Four Principles</span>
          <span className="principles-title-main">We Never Get Bored Of Talking About</span>
        </h2>
      </header>
      <div className="principles-grid">
        {PRINCIPLES.map((item, index) => (
          <article key={index} className="principles-card">
            <h3 className="principles-card-title">{item.title}</h3>
            <p className="principles-card-description">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
});
