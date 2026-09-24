import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Mail,
  Phone,
  Plus,
  Minus,
  GraduationCap,
  Sprout,
  HeartPulse,
  Users,
  Check,
} from "lucide-react";

import Giving, {
  DonationOptions,
  DonationDetails,
  DonationTaxInfo,
} from "./components/Giving";

import ContentPages, { pageInfo } from "./components/ContentPages";

const image = (name) => `/images/${name}.webp`;
const programs = [
  {
    name: "Skills & livelihoods",
    short: "Skills & livelihoods",
    image: "slide_skilling",
    icon: GraduationCap,
    title: (
      <>
        OPPORTUNITY.
        <br />
        FOR EVERYONE.
      </>
    ),
    intro:
      "Skills that open doors. Care that reaches communities. A future we build together.",
    description:
      "Practical learning, industry exposure and career guidance that help young people take their next step.",
    detail:
      "Our Earn & Learn initiative connects classroom learning with practical experience. Hospitality, food service, cookery and business skills help young people prepare for employment and entrepreneurship.",
    action: "Explore skill programs",
    link: "#earn-learn",
  },
  {
    name: "Sustainable agriculture",
    short: "Agriculture",
    image: "slide_agri",
    icon: Sprout,
    title: (
      <>
        STRONGER ROOTS.
        <br />
        BETTER FUTURES.
      </>
    ),
    intro:
      "Supporting the people who grow our food. Building knowledge, healthier soil and resilient livelihoods.",
    description:
      "Working with farming communities on sustainable practices, soil health and stronger market connections.",
    detail:
      "Our agriculture framework focuses on organic practices, soil health, farmer producer organisations and access to knowledge and markets. We bring sustainable livelihoods and environmental care together.",
    action: "Support rural livelihoods",
    link: "#programs",
  },
  {
    name: "Community healthcare",
    short: "Healthcare",
    image: "slide_health",
    icon: HeartPulse,
    title: (
      <>
        CARE THAT REACHES.
        <br />
        HOPE THAT STAYS.
      </>
    ),
    intro:
      "Health awareness, nutrition and community care. Because a healthier tomorrow should be within everyone’s reach.",
    description:
      "Health awareness camps and nutrition initiatives for children and families in our communities.",
    detail:
      "From community health awareness to nutrition support for children affected by cancer, our work brings people together around care. Initiatives include maternal and child health awareness and community outreach in Pune.",
    action: "Explore community care",
    link: "#stories",
  },
  {
    name: "Women & youth empowerment",
    short: "Women & youth",
    image: "slide_women",
    icon: Users,
    title: (
      <>
        HER POTENTIAL.
        <br />
        OUR SHARED FUTURE.
      </>
    ),
    intro:
      "Opening space for skills, confidence and independence. When people thrive, communities move forward.",
    description:
      "Skills, education and entrepreneurship opportunities that help women and young people build independence.",
    detail:
      "We support women and young people through skills development, career orientation and entrepreneurship initiatives. Collaboration with local communities helps make opportunities more accessible.",
    action: "Get involved",
    link: "#get-involved",
  },
];
const faqs = [
  [
    "What does Ekatvabharat Foundation do?",
    "We are a Pune-based Section 8 nonprofit established in 2021, working across skill development, sustainable agriculture, community healthcare, and women and youth empowerment.",
  ],
  [
    "How can I join an Earn & Learn program?",
    "Contact our team with the course you are interested in. We will share current batch availability, eligibility, fees and the application process. Training opportunities include hospitality, cookery and business skills.",
  ],
  [
    "How can my organisation partner with you?",
    "We welcome conversations about CSR-supported training, community initiatives, employee volunteering and other partnerships. Email our team to discuss your priorities and request a project proposal.",
  ],
  [
    "How do I donate or volunteer?",
    "Speak with our team to arrange a contribution or explore volunteering opportunities. We will share verified donation instructions and discuss where your time or skills can help. This website does not collect payments.",
  ],
  [
    "Where does the foundation work?",
    "Our registered office is in Katraj, Pune, with skill training at Vadgaon. Our materials describe community initiatives across Pune and PCMC, alongside rural development work in Maharashtra.",
  ],
];
const stories = [
  {
    image: "community",
    title: "Small moments. A community of care.",
    category: "HEALTH & NUTRITION",
    text: "Coming together to support children and families through community activities and nutrition awareness.",
  },
  {
    image: "outreach",
    title: "Showing up is where change begins.",
    category: "COMMUNITY OUTREACH",
    text: "Local participation and shared effort are at the heart of our work with communities.",
  },
  {
    image: "learning",
    title: "Learning together. Moving forward.",
    category: "COMMUNITY LEARNING",
    text: "Creating spaces to learn, build confidence and connect with new possibilities.",
  },
];

function Dialog({ title, children, onClose, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current.focus();
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const items = ref.current.querySelectorAll(
          'a[href],button,input,select,textarea,[tabindex="0"]',
        );
        const first = items[0],
          last = items[items.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className={`dialog ${wide ? "dialog-wide" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        ref={ref}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="icon-button dialog-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X />
        </button>
        <p className="eyebrow">EKATVABHARAT FOUNDATION</p>
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const isHome = path === "/";
  useEffect(() => {
    document.title = `${isHome ? "Opportunity for Everyone" : pageInfo[path]?.title || "Page not found"} | Ekatvabharat Foundation`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && pageInfo[path]) meta.content = pageInfo[path].description;
  }, [path, isHome]);
  const [slide, setSlide] = useState(2),
    [playing, setPlaying] = useState(false),
    [hover, setHover] = useState(false),
    [menu, setMenu] = useState(false),
    [modal, setModal] = useState(null),
    [faq, setFaq] = useState(0),
    [emailReady, setEmailReady] = useState(false);
  const close = React.useCallback(() => setModal(null), []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!media.matches);
    const change = () => setPlaying(!media.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!playing || hover || modal) return;
    const timer = setInterval(() => {
      if (!document.hidden) setSlide((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, [playing, hover, modal]);
  useEffect(() => {
    if (!menu) return;
    const key = (e) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [menu]);
  const choose = (n) => {
    setSlide((n + 4) % 4);
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      setPlaying(false);
  };
  const openContact = (topic) => {
    setEmailReady(false);
    setModal({
      type:
        topic === "Donation" || topic === "Support our work"
          ? "donation"
          : "contact",
      topic,
    });
  };
  const nav = [
    ["Home", "/"],
    ["Our story", "/about"],
    ["Our work", "/programs"],
    ["Community", "/community"],
    ["CSR partnerships", "/partnerships"],
    ["Contact", "/contact"],
  ];
  function sendEmail(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = `Hello Ekatvabharat Foundation,\n\n${data.get("message")}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nInterest: ${data.get("interest")}`;
    window.location.href = `mailto:info@ekatvabharat.org?subject=${encodeURIComponent(data.get("interest") + " enquiry")}&body=${encodeURIComponent(body)}`;
    setEmailReady(true);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        <div className="container">
          <span>A stronger Bharat starts with opportunity.</span>
          <a href="tel:+919272799605">
            <Phone size={12} /> +91 92727 99605
          </a>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <a
            className="brand"
            href="/"
            aria-label="Ekatvabharat Foundation home"
          >
            <span className="brand-symbol">
              <img src="/images/logo.jpeg" alt="" />
            </span>
            <span className="brand-wordmark">
              <img src="/images/logo.jpeg" alt="Ekatvabharat Foundation" />
            </span>
          </a>
          <nav
            aria-label="Main navigation"
            className={menu ? "navigation open" : "navigation"}
            id="navigation"
          >
            {nav.map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            className="button button-gold header-donate"
            href="/donate"
            aria-current={path === "/donate" ? "page" : undefined}
          >
            Donate <ArrowUpRight size={17} />
          </a>
          <button
            className="menu-button icon-button"
            aria-expanded={menu}
            aria-controls="navigation"
            aria-label={menu ? "Close menu" : "Open menu"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        {isHome ? (
          <>
            <section
              id="home"
              className="hero"
              aria-label="Our work slideshow"
              aria-roledescription="carousel"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHover(true);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setHover(false);
              }}
              onFocusCapture={(e) => {
                if (e.target.matches(":focus-visible")) setHover(true);
              }}
              onBlurCapture={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setHover(false);
              }}
            >
              <div className="hero-photo">
                {programs.map((p, i) => (
                  <img
                    key={p.image}
                    src={image(p.image)}
                    alt=""
                    className={slide === i ? "active" : ""}
                    fetchPriority={i === 2 ? "high" : "auto"}
                  />
                ))}
              </div>
              <div className="hero-shade" />
              <div className="container hero-inner">
                <div
                  className="hero-copy-stack"
                  aria-live={playing ? "off" : "polite"}
                >
                  {programs.map((program, index) => (
                    <div
                      className={`hero-copy ${slide === index ? "is-active" : ""}`}
                      key={program.name}
                      aria-hidden={slide !== index}
                      inert={slide !== index ? "" : undefined}
                    >
                      <p className="eyebrow light">
                        <span /> PEOPLE. POSSIBILITY. PROGRESS.
                      </p>
                      <h1>{program.title}</h1>
                      <p className="hero-description">{program.intro}</p>
                      <div className="hero-actions">
                        <button
                          className="button button-gold"
                          onClick={() => openContact("Support our work")}
                        >
                          Support our work <ArrowUpRight size={19} />
                        </button>
                        <a className="text-link light-link" href={program.link}>
                          {program.action}
                          <ArrowRight size={18} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hero-location">
                  <MapPin size={15} /> Rooted in Pune. Working for a stronger
                  Bharat.
                </div>
                <div className="carousel-bar">
                  <div className="slide-choices" aria-label="Choose a program">
                    {programs.map((p, i) => (
                      <button
                        key={p.short}
                        aria-pressed={slide === i}
                        aria-label={`Show ${p.name} slide`}
                        className={slide === i ? "selected" : ""}
                        onClick={() => choose(i)}
                      >
                        <span>0{i + 1}</span>
                        {p.short}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <div className="manifesto">
              <div className="container">
                <h2>LOCAL ROOTS. SHARED PROGRESS.</h2>
                <p>
                  Bridging rural and urban opportunity. <br />
                  Building a more inclusive India.
                </p>
              </div>
            </div>
            <section className="section about container" id="about">
              <div>
                <p className="eyebrow">01 / OUR PURPOSE</p>
                <h2>
                  A FAIR CHANCE.
                  <br />A LASTING CHANGE.
                </h2>
              </div>
              <div className="about-text">
                <p className="lead">
                  Talent is everywhere.
                  <br />
                  Opportunity should be, too.
                </p>
                <p>
                  At Ekatvabharat Foundation, we bring skills, care and
                  opportunity closer to the people who need them. Founded in
                  Pune in 2021, we work alongside communities to build pathways
                  to independent, dignified lives.
                </p>
                <p>
                  From a first step into employment to healthier families and
                  sustainable farms, our work starts with people — and grows
                  through partnership.
                </p>
                <a className="text-link" href="#programs">
                  Discover what we do <ArrowRight size={18} />
                </a>
              </div>
              <div className="purpose-note">
                <span className="big-year">2021</span>
                <span>
                  THE YEAR OUR
                  <br />
                  SHARED JOURNEY BEGAN
                </span>
                <div className="note-rule" />
                <p>
                  Community-led.
                  <br />
                  Opportunity-focused.
                  <br />
                  Together, for Bharat.
                </p>
              </div>
            </section>
            <section className="section programs-section" id="programs">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">02 / OUR WORK</p>
                    <h2>
                      FOUR PATHWAYS.
                      <br />
                      BRIGHTER FUTURES.
                    </h2>
                  </div>
                  <p>
                    Different needs. One shared purpose: <br />
                    giving people the means to shape <br />
                    their own tomorrow.
                  </p>
                </div>
                <div className="program-grid">
                  {programs.map((p, i) => (
                    <article className="program" key={p.name}>
                      <button
                        className="program-image"
                        onClick={() => setModal({ type: "program", index: i })}
                        aria-label={`Learn about ${p.name}`}
                      >
                        <img
                          src={image(p.image)}
                          alt={`Illustration of ${p.name.toLowerCase()}`}
                          loading="lazy"
                          width="1376"
                          height="768"
                        />
                        <span className="program-number">0{i + 1}</span>
                        <span className="program-arrow">
                          <ArrowUpRight size={22} />
                        </span>
                      </button>
                      <p.icon className="program-icon" size={25} />
                      <h3>{p.name}</h3>
                      <p>{p.description}</p>
                      <button
                        className="text-link"
                        onClick={() => setModal({ type: "program", index: i })}
                      >
                        Explore program <ArrowRight size={17} />
                      </button>
                    </article>
                  ))}
                </div>
                <p className="image-note">
                  Program images are illustrative. Explore photographs from our
                  activities below.
                </p>
              </div>
            </section>
            <section className="earn-section" id="earn-learn">
              <div className="container earn-grid">
                <div className="earn-photo">
                  <img
                    src={image("gallery_cookery_class")}
                    alt="Illustration of practical cookery training"
                    loading="lazy"
                    width="1376"
                    height="768"
                  />
                  <span className="photo-caption">
                    <MapPin size={15} /> EARN & LEARN · VADGAON, PUNE
                  </span>
                </div>
                <div className="earn-copy">
                  <p className="eyebrow light">03 / OPPORTUNITY IN ACTION</p>
                  <h2>
                    LEARN A SKILL.
                    <br />
                    BUILD A FUTURE.
                  </h2>
                  <p>
                    Confidence comes from doing. Our Earn & Learn initiative
                    connects practical training with industry exposure, helping
                    young people find their footing in the world of work.
                  </p>
                  <ul className="check-list">
                    <li>
                      <Check size={17} /> Hands-on hospitality & cookery
                      training
                    </li>
                    <li>
                      <Check size={17} /> Industry-focused learning & career
                      guidance
                    </li>
                    <li>
                      <Check size={17} /> Pathways to employment &
                      entrepreneurship
                    </li>
                  </ul>
                  <button
                    className="button button-gold"
                    onClick={() => openContact("Earn & Learn admission")}
                  >
                    Enquire about a course <ArrowUpRight size={18} />
                  </button>
                  <p className="small-note">
                    Ask our team about current batches, eligibility and fees.
                  </p>
                </div>
              </div>
              <div className="container course-list">
                <span>EXPLORE YOUR PATH</span>
                {[
                  "Food & beverage service",
                  "Professional cookery",
                  "Café management",
                  "Sales & digital skills",
                ].map((c) => (
                  <button key={c} onClick={() => openContact(c)}>
                    {c}
                    <ArrowUpRight size={16} />
                  </button>
                ))}
              </div>
            </section>
            <section className="section container" id="stories">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">04 / FROM OUR COMMUNITIES</p>
                  <h2>
                    REAL PEOPLE.
                    <br />
                    SHARED POSSIBILITIES.
                  </h2>
                </div>
                <p>
                  A glimpse into the gatherings, learning
                  <br />
                  and everyday connections behind our work.
                </p>
              </div>
              <div className="stories-grid">
                {stories.map((s, i) => (
                  <article className="story" key={s.image}>
                    <button
                      className={`story-photo photo-${s.image}`}
                      onClick={() => setModal({ type: "story", index: i })}
                      aria-label={`View ${s.title}`}
                    >
                      <img
                        src={image(s.image)}
                        alt={`${s.category.toLowerCase()} photographs from the foundation’s activity archive`}
                        loading="lazy"
                        width="1000"
                        height="750"
                      />
                      <span>
                        <Plus size={20} />
                      </span>
                    </button>
                    <p className="eyebrow">{s.category}</p>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <button
                      className="text-link"
                      onClick={() => setModal({ type: "story", index: i })}
                    >
                      View photographs <ArrowUpRight size={17} />
                    </button>
                  </article>
                ))}
              </div>
            </section>
            <section className="partners section" id="partners">
              <div className="container">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">05 / BETTER, TOGETHER</p>
                    <h2>
                      GOOD INTENTIONS.
                      <br />
                      GREATER POSSIBILITIES.
                    </h2>
                  </div>
                  <div>
                    <p>
                      Lasting change takes more than one organisation.
                      <br />
                      We collaborate with partners who believe
                      <br />
                      in inclusive growth and stronger communities.
                    </p>
                    <button
                      className="text-link"
                      onClick={() => openContact("CSR partnership")}
                    >
                      Let’s build a partnership <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
                <div className="partner-names">
                  <span>
                    Yardi <small>SOFTWARE</small>
                  </span>
                  <span>
                    Lighthouse
                    <br />
                    <small>COMMUNITIES</small>
                  </span>
                  <span>
                    GOYN <small>GLOBAL OPPORTUNITY YOUTH NETWORK</small>
                  </span>
                </div>
                <p className="small-note">
                  Collaborations documented in our foundation profile and
                  program materials.
                </p>
                <div className="partnership-steps">
                  {[
                    [
                      "01",
                      "Find common ground",
                      "Connect your organisation’s priorities with community needs.",
                    ],
                    [
                      "02",
                      "Shape a meaningful project",
                      "Work with our team on a focused initiative and shared objectives.",
                    ],
                    [
                      "03",
                      "Stay connected to the work",
                      "Build an ongoing relationship with the people and programs you support.",
                    ],
                  ].map(([n, t, d]) => (
                    <div key={n}>
                      <span>{n}</span>
                      <h3>{t}</h3>
                      <p>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="human-story container">
              <div className="human-photo photo-outreach">
                <img
                  src="/images/outreach.webp"
                  alt="Foundation volunteers and local children coming together for a community activity"
                  loading="lazy"
                />
              </div>
              <div className="human-story-copy">
                <p className="eyebrow">CHANGE HAS A HUMAN FACE</p>
                <h2>
                  IT STARTS WITH
                  <br />
                  SHOWING UP.
                </h2>
                <p>
                  With someone who listens. A place to learn. A community that
                  says, “you belong.”
                </p>
                <p>
                  Behind every initiative are people coming together — sharing
                  their time, building confidence and creating room for each
                  other to grow.
                </p>
                <button
                  className="text-link"
                  onClick={() => openContact("Volunteering")}
                >
                  Find your place in the story <ArrowUpRight size={18} />
                </button>
              </div>
            </section>
            <Giving
              onContinue={(donation) =>
                setModal({ type: "donation", donation, step: "details" })
              }
            />
            <DonationTaxInfo />
            <section
              className="section container involvement"
              id="get-involved"
            >
              <div>
                <p className="eyebrow">06 / YOUR PART IN THE STORY</p>
                <h2>
                  THERE’S MORE THAN
                  <br />
                  ONE WAY TO GIVE.
                </h2>
                <p>
                  Your time, experience or support can open
                  <br />a door for someone else.
                </p>
              </div>
              <div className="involvement-options">
                {[
                  [
                    "Support a cause",
                    "Help bring skills, healthcare and opportunity closer to communities.",
                    "Donation",
                  ],
                  [
                    "Share your time",
                    "Bring your experience, energy and ideas to our work.",
                    "Volunteering",
                  ],
                  [
                    "Partner for progress",
                    "Create a focused community initiative with your organisation.",
                    "CSR partnership",
                  ],
                ].map(([t, d, topic], i) => (
                  <button key={t} onClick={() => openContact(topic)}>
                    <span className="option-number">0{i + 1}</span>
                    <span>
                      <strong>{t}</strong>
                      <span>{d}</span>
                    </span>
                    <ArrowUpRight />
                  </button>
                ))}
              </div>
            </section>
            <section className="faq-section section">
              <div className="container faq-grid">
                <div>
                  <p className="eyebrow">A LITTLE MORE CLARITY</p>
                  <h2>
                    GOOD QUESTIONS.
                    <br />
                    STRAIGHT ANSWERS.
                  </h2>
                  <p>Still curious about something?</p>
                  <a className="text-link" href="#contact">
                    Talk to our team <ArrowRight size={18} />
                  </a>
                </div>
                <div>
                  {faqs.map(([q, a], i) => (
                    <div className="faq" key={q}>
                      <h3>
                        <button
                          aria-expanded={faq === i}
                          aria-controls={`answer-${i}`}
                          id={`question-${i}`}
                          onClick={() => setFaq(faq === i ? null : i)}
                        >
                          {q}
                          {faq === i ? <Minus size={19} /> : <Plus size={19} />}
                        </button>
                      </h3>
                      <div
                        id={`answer-${i}`}
                        role="region"
                        aria-labelledby={`question-${i}`}
                        hidden={faq !== i}
                      >
                        <p>{a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="closing">
              <div className="container">
                <p className="eyebrow">ONE BHARAT. COUNTLESS POSSIBILITIES.</p>
                <h2>
                  THE NEXT CHAPTER
                  <br />
                  STARTS WITH US.
                </h2>
                <button
                  className="button button-navy"
                  onClick={() => openContact("Get involved")}
                >
                  Be part of the change <ArrowUpRight size={20} />
                </button>
              </div>
            </section>
          </>
        ) : (
          <ContentPages
            path={path}
            programs={programs}
            stories={stories}
            openContact={openContact}
            setModal={setModal}
          />
        )}
      </main>
      <footer id="contact">
        <div className="container footer-grid">
          <div>
            <a
              className="brand footer-brand"
              href="/"
              aria-label="Back to home"
            >
              <span className="brand-symbol">
                <img src="/images/logo.jpeg" alt="" />
              </span>
              <span className="brand-wordmark">
                <img src="/images/logo.jpeg" alt="Ekatvabharat Foundation" />
              </span>
            </a>
            <p>
              Rooted in community.
              <br />
              Working for a stronger Bharat.
            </p>
            <p className="footer-registration">
              Section 8 nonprofit · Established 2021
              <br />
              Reg. U85300PN2021NPL206842
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            {[...nav, ["Donate", "/donate"]].map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <h3>Let’s talk</h3>
            <a href="mailto:info@ekatvabharat.org">
              <Mail size={16} /> info@ekatvabharat.org
            </a>
            <a href="tel:+919272799605">
              <Phone size={16} /> +91 92727 99605
            </a>
            <a href="tel:+919657723904">
              <Phone size={16} /> +91 96577 23904
            </a>
            <button
              className="text-link light-link"
              onClick={() => openContact("General enquiry")}
            >
              Send an enquiry <ArrowUpRight size={17} />
            </button>
          </div>
          <div>
            <h3>Find us in Pune</h3>
            <address>
              A-430, Ideal Park, Gokul Nagar,
              <br />
              Katraj–Kondhwa Road,
              <br />
              Pune 411046, Maharashtra.
            </address>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Ideal+Park+Gokul+Nagar+Katraj+Pune"
              target="_blank"
              rel="noreferrer"
              className="text-link light-link"
            >
              Get directions <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Ekatvabharat Foundation.</span>
          <button onClick={() => setModal({ type: "privacy" })}>
            Privacy & website information
          </button>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
      {modal?.type === "donation" && (
        <Dialog
          title={
            modal.step === "details"
              ? "Your next step to giving."
              : "A little kindness. A lasting possibility."
          }
          onClose={close}
        >
          {modal.step === "details" ? (
            <DonationDetails
              donation={modal.donation}
              onEdit={() => setModal({ ...modal, step: "choose" })}
            />
          ) : (
            <DonationOptions
              compact
              initialAmount={String(modal.donation?.amount ?? 1000)}
              initialCause={modal.donation?.cause}
              onContinue={(donation) =>
                setModal({ type: "donation", step: "details", donation })
              }
            />
          )}
        </Dialog>
      )}
      {modal?.type === "program" && (
        <Dialog title={programs[modal.index].name} onClose={close}>
          <img
            className="dialog-image"
            src={image(programs[modal.index].image)}
            alt={`Illustration of ${programs[modal.index].name}`}
          />
          <p>{programs[modal.index].detail}</p>
          <button
            className="button button-gold"
            onClick={() => openContact(programs[modal.index].name)}
          >
            Ask about this program <ArrowUpRight size={18} />
          </button>
        </Dialog>
      )}
      {modal?.type === "story" && (
        <Dialog title={stories[modal.index].title} onClose={close} wide>
          <img
            className="archive-image"
            src={image(stories[modal.index].image)}
            alt="Foundation activity photo archive"
          />
          <p>{stories[modal.index].text}</p>
          <p className="small-note">
            Photographs from Ekatvabharat Foundation’s supplied presentation
            archive.
          </p>
        </Dialog>
      )}
      {modal?.type === "privacy" && (
        <Dialog title="Privacy & website information" onClose={close}>
          <p>
            This website does not collect payments or store enquiry form entries
            on a server. Enquiry details are passed to your email application
            only when you choose to prepare an email.
          </p>
          <p>
            Information you email to the foundation is used to respond to your
            enquiry. Contact info@ekatvabharat.org for questions about your
            information.
          </p>
          <p>
            Program illustrations are AI-generated visuals supplied with this
            project. Community photographs are from the foundation’s activity
            archive. External map links open Google Maps.
          </p>
        </Dialog>
      )}
      {modal?.type === "contact" && (
        <Dialog
          title={
            modal.topic === "Donation"
              ? "Give opportunity a helping hand."
              : "Let’s make something meaningful."
          }
          onClose={close}
        >
          <p>
            {modal.topic === "Donation"
              ? "Contact our team for verified contribution details and documentation. No payment is taken on this website."
              : "Tell us a little about your interest. We’ll help you find the right next step."}
          </p>
          <form onSubmit={sendEmail}>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  autoComplete="email"
                  type="email"
                  required
                  maxLength={200}
                />
              </label>
            </div>
            <label>
              I’m interested in
              <input
                name="interest"
                defaultValue={modal.topic}
                required
                maxLength={150}
              />
            </label>
            <label>
              Your message
              <textarea
                name="message"
                required
                rows={3}
                maxLength={3000}
                placeholder="How would you like to get involved?"
              />
            </label>
            <button className="button button-gold" type="submit">
              Prepare email <ArrowUpRight size={18} />
            </button>
            <p className="small-note">
              Opens your email app. Review and send your message there.
            </p>
            {emailReady && (
              <p role="status" className="email-status">
                Your email draft has been requested. If no email app opened,
                write to{" "}
                <a href="mailto:info@ekatvabharat.org">info@ekatvabharat.org</a>{" "}
                or call <a href="tel:+919272799605">+91 92727 99605</a>. Your
                message has not been submitted through this website.
              </p>
            )}
          </form>
        </Dialog>
      )}
    </>
  );
}
