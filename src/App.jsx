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

import PartnershipSection from "./components/PartnershipSection";
import ProgramsSection from "./components/ProgramsSection";
import PurposeSection from "./components/PurposeSection";
import HeroCarousel from "./components/HeroCarousel";
import Giving, { DonationTaxInfo } from "./components/Giving";
import ContentPages, { pageInfo } from "./components/ContentPages";
import EnquiryForm from "./components/EnquiryForm";
import { EvidenceStrip, TrustSection } from "./components/TrustSections";
import { programDetails } from "./data/programs";

const image = (name) => `/images/${name}.webp`;
const programIcons = [GraduationCap, Sprout, HeartPulse, Users];
const programs = programDetails.map((program, index) => ({
  ...program,
  icon: programIcons[index],
  detail: program.description + " " + program.evidence,
}));
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
    "Speak with our team to arrange a contribution or explore volunteering opportunities. We will share verified donation instructions and discuss where your time or skills can help. Use the contribution page for available payment options. Online payments are confirmed after verification; bank transfers are reconciled by the team.",
  ],
  [
    "Where does the foundation work?",
    "We are based in Pune. Our materials describe community initiatives across Pune and PCMC, alongside rural development work in Maharashtra.",
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
  const [showContribute, setShowContribute] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) {
      setShowContribute(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setShowContribute(!entry.isIntersecting),
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [path]);
  const [menu, setMenu] = useState(false),
    [modal, setModal] = useState(null),
    [faq, setFaq] = useState(0);
  const close = React.useCallback(() => setModal(null), []);
  useEffect(() => {
    if (!menu) return;
    const key = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [menu]);
  const openContact = (topic) => {
    if (topic === "Donation" || topic === "Support our work") {
      window.location.href = "/donate";
      return;
    }
    setModal({ type: "contact", topic });
  };
  const goDonate = ({ amount, cause }) => {
    window.location.href = `/donate?${new URLSearchParams({ amount, cause })}`;
  };
  const nav = [
    ["Home", "/"],
    ["Our story", "/about"],
    ["Our work", "/programs"],
    ["Community", "/community"],
    ["Transparency", "/transparency"],
    ["CSR partnerships", "/partnerships"],
    ["Contact", "/contact"],
  ];
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
      <main id="main" className={isHome ? "home-journal" : undefined}>
        {isHome ? (
          <>
            <HeroCarousel />
            <EvidenceStrip />
            <PurposeSection />
            <ProgramsSection programs={programs} onExplore={(index) => setModal({ type: "program", index })} />
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
                    From learning
                    <br />
                    to a next step.
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
                  <h2>A glimpse of our work</h2>
                </div>
                <p>
                  Photos from our training sessions, community gatherings and
                  outreach activities.
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
            <PartnershipSection onEnquire={() => openContact("CSR partnership")} />
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
                  It starts with
                  <br />
                  showing up.
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
            <TrustSection />
            <Giving onContinue={goDonate} />
            <DonationTaxInfo />
            <section
              className="section container involvement"
              id="get-involved"
            >
              <div>
                <p className="eyebrow">06 / YOUR PART IN THE STORY</p>
                <h2>
                  There’s more than
                  <br />
                  one way to give.
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
                    Good questions.
                    <br />
                    Straight answers.
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
                  The next chapter
                  <br />
                  starts with us.
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
      <footer id="contact" className={isHome ? "journal-footer" : undefined}>
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
            {[
              ...nav,
              ["Donate", "/donate"],
              ["Get involved", "/get-involved"],
            ].map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <h3>Let’s talk</h3>
            <a href="mailto:info@ekatvabharatfoundation.com">
              <Mail size={16} /> info@ekatvabharatfoundation.com
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
            <address>Pune</address>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Pune"
              target="_blank"
              rel="noreferrer"
              className="text-link light-link"
            >
              View Pune on map <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Ekatvabharat Foundation.</span>
          <a href="/privacy">Privacy</a>
          <a href="/donation-policy">Donation information</a>
          <a href="/transparency">Transparency</a>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
      {!modal && showContribute && path !== "/donate" && path !== "/admin" && (
        <a className="mobile-contribute" href="/donate">
          Make a contribution <ArrowUpRight size={18} />
        </a>
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
          <EnquiryForm topic={modal.topic} />
        </Dialog>
      )}
    </>
  );
}
