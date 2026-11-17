import { readFile, writeFile, mkdir } from "node:fs/promises";
const html = await readFile("dist/index.html", "utf8");
const pages = {
  transparency: [
    "Transparency",
    "Understand our foundation, historical activity records and documentation requests.",
  ],
  "get-involved": [
    "Get involved",
    "Explore volunteering, learning and partnership opportunities in Pune.",
  ],
  privacy: ["Privacy", "How we use enquiry, donation and payment information."],
  "donation-policy": [
    "Donation information",
    "Payment confirmation, contribution preferences, refunds and documentation.",
  ],
  admin: ["Foundation administration", "Restricted foundation workspace."],
  about: [
    "Our Story",
    "Meet the mission and values of Ekatvabharat Foundation, a Pune-based nonprofit established in 2021.",
  ],
  programs: [
    "Programs",
    "Explore skills, agriculture, healthcare and empowerment programs at Ekatvabharat Foundation.",
  ],
  community: [
    "Community",
    "View photographs from Ekatvabharat Foundation community activities.",
  ],
  partnerships: [
    "CSR Partnerships",
    "Connect your organisation with community development and skills initiatives.",
  ],
  donate: [
    "Donate",
    "Support Ekatvabharat Foundation through available online and bank-transfer contribution options.",
  ],
  contact: [
    "Contact",
    "Contact Ekatvabharat Foundation in Pune for courses, volunteering, donations and partnerships.",
  ],
};
for (const [path, [title, description]] of Object.entries(pages)) {
  await mkdir(`dist/${path}`, { recursive: true });
  await writeFile(
    `dist/${path}/index.html`,
    (path === "admin"
      ? html.replace(
          "</head>",
          '<meta name="robots" content="noindex,nofollow"></head>',
        )
      : html
    )
      .replace(
        /<title>.*?<\/title>/s,
        `<title>${title} | Ekatvabharat Foundation</title>`,
      )
      .replace(
        /(<meta\s+name="description"\s+content=")[^"]*/s,
        `$1${description}`,
      ),
  );
}
await writeFile(
  "dist/404.html",
  html.replace(
    /<title>.*?<\/title>/s,
    "<title>Page not found | Ekatvabharat Foundation</title>",
  ),
);
