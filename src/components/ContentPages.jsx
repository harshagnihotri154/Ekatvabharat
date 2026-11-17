import React from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
} from "lucide-react";
import PageIntro from "./PageIntro";
import "./ContentPages.css";
import DonationCheckout from "./DonationCheckout";
import InformationPages, { informationPages } from "./InformationPages";
import AdminPage from "./AdminPage";
import { programDetails } from "../data/programs";

export const pageInfo = {
  ...informationPages,
  "/about": {
    title: "Our Story",
    heading: "Rooted in community.\nUnited by possibility.",
    description:
      "Get to know Ekatvabharat Foundation: a Pune-based nonprofit working to bridge opportunity gaps and support independent, dignified lives.",
    image: "outreach",
  },
  "/programs": {
    title: "Programs",
    heading: "Practical skills.\nShared progress.",
    description:
      "Explore our work in livelihoods, agriculture, healthcare, and women and youth empowerment.",
    image: "slide_skilling",
  },
  "/community": {
    title: "Community",
    heading: "The people behind\nthe possibilities.",
    description:
      "Explore photographs and moments from our community activities, learning spaces and outreach initiatives.",
    image: "community",
  },
  "/partnerships": {
    title: "CSR Partnerships",
    heading: "Bring your purpose.\nBuild with ours.",
    description:
      "Collaborate with Ekatvabharat Foundation on skills, community care and inclusive development.",
    image: "slide_agri",
  },
  "/donate": {
    title: "Donate",
    heading: "Your kindness.\nSomeone’s next step.",
    description:
      "Choose an amount and cause, explore available payment options and understand how your contribution is confirmed.",
    image: "learning",
  },
  "/contact": {
    title: "Contact",
    heading: "A conversation\ncan start a change.",
    description:
      "Reach our Pune team for course enquiries, volunteering, donations and partnerships.",
    image: "outreach",
  },
};
const img = (name) => `/images/${name}.webp`;
export default function ContentPages({
  path,
  programs,
  stories,
  openContact,
  setModal,
}) {
  const page = pageInfo[path];
  if (!page)
    return (
      <section className="section container missing-page">
        <p className="eyebrow">PAGE NOT FOUND</p>
        <h1>LET’S FIND YOUR WAY.</h1>
        <p>The page you requested isn’t available.</p>
        <a className="button button-gold" href="/">
          Back to home <ArrowRight size={18} />
        </a>
      </section>
    );
  return (
    <div className={`interior-pages ${path === "/admin" ? "interior-admin" : "interior-public"}`}>
      <PageIntro page={page} path={path} />
      <div id="page-content" />
      {path === "/about" && (
        <>
          <section className="container section page-split">
            <div className="page-archive">
              <img
                src={img("outreach")}
                alt="Community members and the foundation team at an outreach activity"
              />
            </div>
            <div>
              <p className="eyebrow">OUR JOURNEY / SINCE 2021</p>
              <h2>
                Opportunity should
                <br />
                belong to everyone.
              </h2>
              <p>
                Established as a Section 8 company in 2021, Ekatvabharat
                Foundation works to bridge the opportunity gaps between rural
                and urban India.
              </p>
              <p>
                Our work brings together education, employability, health and
                sustainable livelihoods. We collaborate with communities and
                organisations to help people build skills, confidence and
                independence.
              </p>
              <a className="text-link" href="/programs">
                Meet our programs <ArrowRight size={18} />
              </a>
            </div>
          </section>
          <section className="page-tinted section">
            <div className="container">
              <p className="eyebrow">WHAT GUIDES US</p>
              <div className="page-three">
                <article>
                  <h3>Our mission</h3>
                  <p>
                    Empower children, young people and women through health,
                    education, environmental care and secure livelihoods,
                    working alongside strategic partners.
                  </p>
                </article>
                <article>
                  <h3>Our vision</h3>
                  <p>
                    A future where people have the skills and opportunities to
                    earn their livelihood and shape their own lives.
                  </p>
                </article>
                <article>
                  <h3>Our values</h3>
                  <p>
                    Dignity and respect. Professional responsibility.
                    Transparency and accountability. Service excellence and
                    confidentiality.
                  </p>
                </article>
              </div>
            </div>
          </section>
          <section className="container section page-split">
            <div>
              <p className="eyebrow">ACCOUNTABILITY MATTERS</p>
              <h2>
                Know the foundation
                <br />
                you’re supporting.
              </h2>
            </div>
            <div>
              <p>
                Registered as Ekatvabharat Foundation, a Section 8 nonprofit.
              </p>
              <dl className="bank-details">
                <div>
                  <dt>Registration</dt>
                  <dd>U85300PN2021NPL206842</dd>
                </div>
                <div>
                  <dt>Established</dt>
                  <dd>2021</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>Pune, Maharashtra</dd>
                </div>
              </dl>
              <p className="small-note">
                Contact our team to request current registration and approval
                documents.
              </p>
              <button
                className="text-link"
                onClick={() => openContact("Foundation documents")}
              >
                Request documents <ArrowUpRight size={18} />
              </button>
            </div>
          </section>
        </>
      )}
      {path === "/programs" && (
        <section className="container section program-details-list">
          <nav className="program-jump-links" aria-label="Program focus areas">{programDetails.map((program, i) => <a key={program.slug} href={`#${program.slug}`}><span>0{i + 1}</span>{program.name}<ArrowRight size={16} aria-hidden="true" /></a>)}</nav>
          {programDetails.map((program, i) => (
            <article
              className="page-split program-detail"
              id={program.slug}
              key={program.slug}
            >
              <div>
                <img
                  className="page-program-photo"
                  src={img(program.image)}
                  alt={`Illustration representing ${program.name.toLowerCase()}`}
                  loading="lazy"
                />
                <p className="image-note">Illustrative program image</p>
              </div>
              <div>
                <p className="eyebrow">
                  0{i + 1} / {program.status}
                </p>
                <h2>{program.name}</h2>
                <h3>{program.summary}</h3>
                <p>{program.description}</p>
                <ul className="program-activities">
                  {program.activities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="evidence-note">
                  <strong>What our records show</strong>
                  <p>{program.evidence}</p>
                </div>
                <p>{program.next}</p>
                <div className="action-row">
                  <button
                    className="button button-gold"
                    onClick={() => openContact(program.name)}
                  >
                    Enquire about this program <ArrowUpRight size={18} />
                  </button>
                  <a
                    className="text-link"
                    href={`/donate?${new URLSearchParams({ cause: program.name })}`}
                  >
                    Support this focus area <ArrowRight size={17} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
      {path === "/community" && (
        <section className="container section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FROM THE FOUNDATION ARCHIVE</p>
              <h2>
                Moments that
                <br />
                bring us together.
              </h2>
            </div>
            <p>
              Photographs from our supplied activity records.
              <br />
              Select a story to explore the full photo collection.
            </p>
          </div>
          <div className="community-page-grid">
            {stories.map((s, i) => (
              <article className="story" key={s.image}>
                <button
                  className={`story-photo photo-${s.image}`}
                  onClick={() => setModal({ type: "story", index: i })}
                  aria-label={`View ${s.title}`}
                >
                  <img
                    src={img(s.image)}
                    alt={`${s.category.toLowerCase()} activity archive`}
                  />
                  <span>
                    <ArrowUpRight size={20} />
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
      )}
      {path === "/partnerships" && (
        <>
          <section className="container section page-split">
            <div>
              <p className="eyebrow">PURPOSE INTO PRACTICE</p>
              <h2>
                Build something
                <br />
                that matters.
              </h2>
              <p>
                Connect your organisation’s priorities with community needs.
                Together, we can shape focused initiatives in skills, health,
                sustainable livelihoods and empowerment.
              </p>
              <button
                className="button button-gold"
                onClick={() => openContact("CSR partnership proposal")}
              >
                Discuss a partnership <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="partnership-menu">
              {[
                "Skills and employability programs",
                "Community health and nutrition",
                "Women and youth empowerment",
                "Sustainable agriculture and livelihoods",
              ].map((s) => (
                <div key={s}>
                  <Check size={20} />
                  {s}
                </div>
              ))}
            </div>
          </section>
          <section className="page-tinted section">
            <div className="container">
              <p className="eyebrow">COLLABORATIONS IN OUR PROGRAM RECORDS</p>
              <div className="page-three">
                <article>
                  <h3>Yardi Software</h3>
                  <p>
                    Collaboration on hospitality skills and women’s empowerment.
                    The 2024–25 presentation records four completed batches in
                    the PMC area.
                  </p>
                </article>
                <article>
                  <h3>Lighthouse Communities</h3>
                  <p>
                    Collaboration on hospitality training, café and hotel
                    management, employment and entrepreneurship in Pune and
                    PCMC.
                  </p>
                </article>
                <article>
                  <h3>GOYN</h3>
                  <p>
                    Support for student mobilisation, promotion and awareness to
                    make vocational opportunities more accessible.
                  </p>
                </article>
              </div>
            </div>
          </section>
          <section className="container section">
            <p className="eyebrow">START A CONVERSATION</p>
            <h2>Let’s shape the next project.</h2>
            <p className="page-intro">
              Tell us your focus area, community or location, proposed timeline
              and how you’d like to participate. Our team will discuss scope,
              documentation and next steps with you.
            </p>
            <button
              className="text-link"
              onClick={() => openContact("CSR partnership")}
            >
              Contact our partnerships team <ArrowUpRight size={18} />
            </button>
          </section>
        </>
      )}
      {path === "/donate" && <DonationCheckout />}
      {informationPages[path] && path !== "/admin" && (
        <InformationPages path={path} openContact={openContact} />
      )}
      {path === "/admin" && <AdminPage />}
      {path === "/contact" && (
        <section className="container section contact-page-grid">
          <article>
            <MapPin size={28} />
            <h2>Visit us.</h2>
            <h3>Registered office</h3>
            <address>Pune</address>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Pune"
              target="_blank"
              rel="noreferrer"
            >
              View Pune on map <ArrowUpRight size={17} />
            </a>
            <h3>Training campus</h3>
            <p>
              Pune.
              <br />
              Contact us to arrange a visit and confirm directions.
            </p>
          </article>
          <article>
            <Mail size={28} />
            <h2>Let’s talk.</h2>
            <a className="contact-direct" href="mailto:info@ekatvabharatfoundation.com">
              info@ekatvabharatfoundation.com
            </a>
            <a className="contact-direct" href="tel:+919272799605">
              +91 92727 99605
            </a>
            <a className="contact-direct" href="tel:+919657723904">
              +91 96577 23904
            </a>
            <p>
              Choose what you’d like to discuss. Your enquiry is saved securely
              for the foundation team to follow up.
            </p>
            <div className="contact-topics">
              {[
                "General enquiry",
                "Course admission",
                "Volunteering",
                "CSR partnership",
              ].map((t) => (
                <button
                  className="text-link"
                  key={t}
                  onClick={() => openContact(t)}
                >
                  {t}
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          </article>
        </section>
      )}
      {path !== "/donate" && path !== "/admin" && (
        <section className="page-cta">
          <div className="container">
            <h2>There’s a place for you here.</h2>
            <a
              className="button button-navy"
              href={path === "/contact" ? "/donate" : "/contact"}
            >
              {path === "/contact" ? "Support our work" : "Get in touch"}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
