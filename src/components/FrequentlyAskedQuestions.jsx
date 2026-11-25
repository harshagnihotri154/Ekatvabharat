import React from "react";
import { pageFaqs } from "../data/faqs";

export default function FrequentlyAskedQuestions({ path }) {
  const questions = pageFaqs[path];
  if (!questions) return null;
  return <section className="faq-section section" aria-labelledby="faq-heading" id="questions">
    <div className="container faq-grid">
      <div>
        <p className="eyebrow">A LITTLE MORE CLARITY</p>
        <h2 id="faq-heading">Frequently asked questions</h2>
        <p>Explore our <a href="/programs">programs</a>, read our <a href="/transparency">foundation records</a> or <a href="/contact">contact the Pune team</a> for current details.</p>
      </div>
      <div>{questions.map(([question, answer], index) => <details className="faq" key={question} open={index === 0}>
        <summary>{question}</summary>
        <p>{answer}</p>
      </details>)}</div>
    </div>
  </section>;
}
