import React from "react";
import { ArrowRight } from "lucide-react";

const visuals = {
  "/about": { image: "hero-cooking", caption: "Learning together. Growing together." },
  "/programs": { image: "slide_skilling", caption: "Practical learning. Possibilities for life." },
  "/community": { image: "hero-community-learning", caption: "A community is built through connection." },
  "/partnerships": { image: "hero-community-learning", caption: "Your purpose, connected with our communities." },
  "/get-involved": { image: "hero-cooking", caption: "Bring your time, your skills and your ideas." },
};
const actions = {
  "/about": ["Discover our journey", "#page-content"],
  "/programs": ["Explore our focus areas", "#page-content"],
  "/community": ["Browse the archive", "#page-content"],
  "/partnerships": ["Explore ways to partner", "#page-content"],
  "/get-involved": ["Find your way to contribute", "#page-content"],
};
export default function PageIntro({ page, path }) {
  const visual = visuals[path];
  const lines = page.heading.split("\n");
  return <section className={`page-intro-banner ${visual ? "has-visual" : "is-compact"}`}>
    <div className="container">
      <nav className="page-trail" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></nav>
      <div className="page-intro-layout"><div className="page-intro-copy">
        <p className="page-label">Ekatvabharat Foundation / {page.title}</p>
        <h1>{lines.map((line, i) => <span key={line} className={i ? "page-title-accent" : undefined}>{line}</span>)}</h1>
        <p className="page-intro-description">{page.description}</p>
        {actions[path] && <a className="page-intro-action" href={actions[path][1]}>{actions[path][0]}<ArrowRight size={18} aria-hidden="true" /></a>}
      </div>
      {visual && <figure className="page-intro-visual"><img src={`/images/${visual.image}.webp`} alt={visual.caption} fetchpriority="high" width="1200" height="800" /><figcaption><span>{visual.caption}</span><small>Illustrative visual</small></figcaption></figure>}
      </div>
    </div>
  </section>;
}
