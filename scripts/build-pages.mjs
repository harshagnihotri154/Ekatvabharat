import { readFile, writeFile, mkdir } from "node:fs/promises";
const html = await readFile("dist/index.html", "utf8");
const pages = {
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
    "Support Ekatvabharat Foundation with direct bank-transfer donation options and documentation guidance.",
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
    html
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
