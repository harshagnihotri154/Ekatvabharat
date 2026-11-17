import React from "react";
import { ArrowUpRight, Compass, Layers, Handshake } from "lucide-react";
import "./PartnershipSection.css";

const steps = [
  { icon: Compass, title: "Find common ground", text: "Connect your organisation’s priorities with community needs." },
  { icon: Layers, title: "Shape a meaningful project", text: "Work with our team on a focused initiative and shared objectives." },
  { icon: Handshake, title: "Stay connected to the work", text: "Build an ongoing relationship with the people and programs you support." },
];

export default function PartnershipSection({ onEnquire }) {
  return <section className="partnership-section" id="partners" aria-labelledby="partnership-title">
    <div className="container">
      <div className="partnership-feature">
        <div className="partnership-intro">
          <p className="partnership-kicker">05 / Better, together</p>
          <h2 id="partnership-title">Good intentions.<br /><em>Greater possibilities.</em></h2>
          <p className="partnership-description">Lasting change takes more than one organisation. We collaborate with partners who believe in inclusive growth and stronger communities.</p>
          <button className="partnership-action" onClick={onEnquire}>Let’s build a partnership <ArrowUpRight size={20} aria-hidden="true" /></button>
          <p className="partnership-invitation">Your expertise. Our community connections. A shared purpose.</p>
        </div>
        <figure className="partnership-visual">
          <img src="/images/hero-community-learning.webp" alt="Illustrative scene of women learning practical skills together" loading="lazy" width="1536" height="1024" />
          <figcaption><span>Opportunity grows<br /><strong>when we work together.</strong></span><small>Illustrative visual</small></figcaption>
        </figure>
      </div>
      <div className="collaborator-strip">
        <div className="collaborator-heading"><span>Connections that<br />bring us together</span><small>From our 2024–25 presentation</small></div>
        <ul aria-label="Organisations named in our foundation presentation">
          <li><strong>Yardi</strong><span>Software</span></li>
          <li><strong>Lighthouse</strong><span>Communities</span></li>
          <li><strong>GOYN</strong><span>Global Opportunity<br />Youth Network</span></li>
        </ul>
      </div>
      <p className="collaborator-note">Collaborations described in our 2024–25 foundation presentation; current arrangements may differ.</p>
      <div className="partnership-path-heading"><p className="partnership-kicker">From a conversation to collaboration</p><h3>A shared purpose. A clear path.</h3></div>
      <ol className="partnership-path">{steps.map(({ icon: Icon, title, text }, index) => <li key={title}>
        <div className="partnership-step-top"><span>0{index + 1}</span><Icon size={27} strokeWidth={1.5} aria-hidden="true" /></div>
        <h4>{title}</h4><p>{text}</p>
      </li>)}</ol>
    </div>
  </section>;
}
