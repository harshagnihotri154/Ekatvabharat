import { ArrowRight } from "lucide-react";
import "./ProgramsSection.css";

const summaries = {
  skills: "Practical training to prepare for work and independent livelihoods.",
  agriculture: "Exploring partnerships for sustainable farming and rural livelihoods.",
  healthcare: "Community activities, health awareness and care for one another.",
  empowerment: "Skills, confidence and space to take the next step.",
};

export default function ProgramsSection({ programs, onExplore }) {
  return (
    <section className="section work-section" id="programs" aria-labelledby="work-heading">
      <div className="container">
        <header className="work-heading">
          <p className="eyebrow">02 / OUR WORK</p>
          <h2 id="work-heading">Where possibility begins.</h2>
          <p className="work-intro">Practical learning, community care and opportunities to grow.</p>
        </header>
        <div className="work-grid">
          {programs.map((program, index) => (
            <article className="work-card" key={program.slug}>
              <button className="work-photo" onClick={() => onExplore(index)} aria-label={`Learn about ${program.name}`}>
                <img src={`/images/${program.image}.webp`} alt={`Illustration of ${program.name.toLowerCase()}`} loading="lazy" width="600" height="600" />
              </button>
              <div className="work-copy">
                <program.icon className="work-icon" size={30} aria-hidden="true" />
                <h3>{program.name}</h3>
                {program.slug === "agriculture" && <p className="work-status">Planning &amp; partnerships</p>}
                <p className="work-description">{summaries[program.slug]}</p>
                <button className="work-explore" onClick={() => onExplore(index)} aria-label={`Explore program: ${program.name}`}>
                  Explore <ArrowRight size={22} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
