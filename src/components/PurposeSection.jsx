import { ArrowRight } from "lucide-react";
import "./PurposeSection.css";

export default function PurposeSection() {
  return (
    <section className="section container purpose-section" id="about" aria-labelledby="purpose-heading">
      <header className="purpose-heading">
        <p className="eyebrow">01 / OUR PURPOSE</p>
        <h2 id="purpose-heading">A fair chance.<br /><em>A lasting change.</em></h2>
      </header>
      <div className="purpose-layout">
        <aside className="purpose-origin" aria-label="Our beginnings">
          <p className="purpose-origin-label">Our journey began in</p>
          <p className="purpose-year">2021</p>
          <p className="purpose-place">Pune, Maharashtra</p>
          <p className="purpose-values">Community-led.<br />Opportunity-focused.<br />Together, for Bharat.</p>
        </aside>
        <div className="purpose-story">
          <p className="purpose-lead">Talent is everywhere.<br />Opportunity should be, too.</p>
          <p>At Ekatvabharat Foundation, we bring skills, care and opportunity closer to the people who need them. Founded in Pune in 2021, we work alongside communities to build pathways to independent, dignified lives.</p>
          <p>Our materials document training and community activities. New initiatives begin with local needs, clear plans and partners ready to support delivery.</p>
          <a className="purpose-link" href="#programs">Discover what we do <ArrowRight aria-hidden="true" /></a>
        </div>
      </div>
      <ul className="purpose-pillars" aria-label="Our purpose in practice">
        <li>Skills for independence</li>
        <li>Care within reach</li>
        <li>Opportunity, together</li>
      </ul>
    </section>
  );
}
