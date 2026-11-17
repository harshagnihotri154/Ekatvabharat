import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import "./HeroCarousel.css";

const slides = [
  {
    style: "mission", label: "Our community", eyebrow: "Ekatvabharat Foundation · A Pune-based NGO",
    title: "Many journeys. One shared future.", lines: ["Many journeys.", "One shared future."],
    text: "A young person learning a skill. A woman taking her next step. A child finding encouragement. We bring people together so more lives have room to grow.",
    primary: ["Support our work", "/donate"], secondary: ["Meet the foundation", "/about"],
    images: [["journal-learner", "Illustration of a woman learning with a notebook"], ["hero-cooking", "Illustration of women learning cooking skills together"], ["journal-community", "Illustration of a community gathering"]],
    note: "Rooted in Pune. Working alongside children, young people and women since 2021.", noteLink: ["Know our work", "/transparency"],
  },
  {
    style: "skills", label: "Learning & livelihoods", eyebrow: "Earn & Learn · Building confidence through practice",
    title: "A skill to learn. A future to build.", lines: ["A skill to learn.", "A future to build."],
    text: "The first day in a kitchen. The confidence to try something new. Through practical learning, we help young people take steps towards work and greater independence.",
    primary: ["Explore our programs", "/programs#skills"], secondary: ["Support skills training", "/donate?cause=Skills+%26+livelihoods"],
    images: [["journal-learner", "Illustration of a learner preparing for class"], ["slide_skilling", "Illustration of learners practising cookery in a training kitchen"], ["hero-community-learning", "Illustration of a teacher guiding adult learners"]],
    note: "4 completed hospitality batches documented in 2024–25. Ask our team about current courses.", noteLink: ["Read the activity record", "/transparency"],
  },
  {
    style: "participate", label: "Be part of it", eyebrow: "Give your time · Share your skills · Stand alongside us",
    title: "Small acts of care. Stronger communities.", lines: ["Small acts of care.", "Stronger communities."],
    text: "You might have a skill to share, a few hours to give, or an organisation ready to help. Start with what you can offer. Together, we can explore where it matters.",
    primary: ["Find your way to help", "/get-involved"], secondary: ["Build a partnership", "/partnerships"],
    images: [["hero-community-learning", "Illustration of women sharing practical knowledge"], ["journal-community", "Illustration of women connecting at a community gathering"], ["journal-learner", "Illustrative portrait of an adult learner"]],
    note: "Let’s find a role that fits your interests, experience and availability.", noteLink: ["Talk to our team", "/contact"],
  },
];

function SlideContent({ slide, current, index }) {
  const Heading = current ? "h1" : "h2";
  return <div className="feature-layout">
    <div className="feature-copy">
      <p className="feature-eyebrow">{slide.eyebrow}</p>
      <Heading>{slide.lines.map((line, i) => <React.Fragment key={line}>{i > 0 && " "}<span>{line}</span></React.Fragment>)}</Heading>
      <p className="feature-description">{slide.text}</p>
      <div className="feature-actions">
        <a className="feature-donate" href={slide.primary[1]}>{slide.primary[0]} <ArrowRight size={18} aria-hidden="true" /></a>
        <a className="feature-explore" href={slide.secondary[1]}>{slide.secondary[0]} <ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </div>
    <figure className="feature-photo-band">
      {slide.images.map(([image, alt], i) => <img key={`${image}-${i}`} src={`/images/${image}.webp`} alt={alt} width="1000" height="750" loading={index === 0 ? "eager" : "lazy"} fetchpriority={index === 0 ? "high" : "low"} />)}
    </figure>
    <div className="feature-evidence"><p>{slide.note}</p><a href={slide.noteLink[1]}>{slide.noteLink[0]} <ArrowRight size={16} aria-hidden="true" /></a></div>
  </div>;
}

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const root = useRef(null);
  const touchStart = useRef(null);
  const navigate = (index) => { setActive((index + slides.length) % slides.length); setPlaying(false); };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!media.matches);
    const reduce = () => { if (media.matches) setPlaying(false); };
    const visibility = () => setVisible(!document.hidden);
    media.addEventListener("change", reduce);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden));
    observer.observe(root.current);
    return () => { media.removeEventListener("change", reduce); document.removeEventListener("visibilitychange", visibility); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!playing || hovered || !visible) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 3000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, visible]);

  return <section id="home" ref={root} className={`feature-carousel theme-${slides[active].style}`} aria-label="Our purpose and community" aria-roledescription="carousel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={(event) => { if (!event.target.closest('[data-playback]')) setPlaying(false); }}
    onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
    onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(distance) > 60) navigate(active + (distance > 0 ? 1 : -1)); touchStart.current = null; }}
    onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); navigate(active + (event.key === "ArrowRight" ? 1 : -1)); } }}>
    <div className="feature-stage" aria-live={playing ? "off" : "polite"}>
      {slides.map((slide, index) => <article key={slide.style} className={`feature-slide feature-${slide.style} ${active === index ? "is-current" : ""}`} aria-hidden={active !== index} inert={active !== index ? "" : undefined} aria-roledescription="slide" aria-label={`${index + 1} of 3: ${slide.label}`}>
        <SlideContent slide={slide} current={index === active} index={index} />
      </article>)}
    </div>
    <div className="feature-controls"><div className="feature-pagination" aria-label="Choose a slide">{slides.map((slide, index) => <button key={slide.style} aria-label={`Show slide ${index + 1}: ${slide.label}`} aria-pressed={index === active} onClick={() => navigate(index)}><span className="feature-index">0{index + 1}</span></button>)}</div>
      <div className="feature-navigation"><button aria-label="Previous slide" onClick={() => navigate(active - 1)}><ChevronLeft size={20} /></button><button data-playback aria-label={playing ? "Pause slideshow" : "Play slideshow"} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={17} /> : <Play size={17} />}</button><button aria-label="Next slide" onClick={() => navigate(active + 1)}><ChevronRight size={20} /></button></div>
    </div>
  </section>;
}
