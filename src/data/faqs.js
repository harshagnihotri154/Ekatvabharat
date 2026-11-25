export const homeFaqs = [
  [
    "What does Ekatvabharat Foundation do?",
    "We are a Pune-based Section 8 nonprofit established in 2021, focused on skills training, community care, and women and youth empowerment. Sustainable agriculture is a planning and partnership focus; contact our team for current project availability.",
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

export const pageFaqs = {
  "/": homeFaqs,
  "/programs": [homeFaqs[1], ["Are agriculture projects currently running?", "Sustainable agriculture is a planning and partnership focus. Discuss the proposed location, delivery partners, scope and funding needs with the foundation before selecting a restricted contribution."], ["Does Earn & Learn guarantee a job?", "No employment or placement guarantee is published. The 2024–25 foundation presentation records four completed hospitality batches supported by Yardi Software. Ask the team about current training and career-guidance arrangements."]],
  "/partnerships": [homeFaqs[2], ["How do we scope a CSR partnership?", "Share your organisation’s priorities, proposed location, timeline and intended support. Request a project proposal and current foundation documents, then agree on activities, responsibilities and reporting with the team."]],
  "/get-involved": [["How can I volunteer in Pune?", "Send the foundation your interests, skills, location and availability through the contact page. The team will discuss relevant opportunities and current arrangements before you commit."], ["Can I help with training or community activities?", "You can enquire about sharing professional skills, supporting practical learning or participating in community initiatives. Roles and schedules depend on current needs and must be confirmed with the foundation."]],
  "/about": [homeFaqs[0], homeFaqs[4]],
};
