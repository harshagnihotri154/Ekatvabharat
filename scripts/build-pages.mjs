import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { render } from "../.prerender/entry-server.js";
import { seoPages, missingSeo, siteUrl, siteName } from "../src/seo/pages.js";
const template = await readFile("dist/index.html", "utf8");
const escape = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const organization = {
  "@type": "Organization", "@id": `${siteUrl}/#organization`, name: siteName,
  url: `${siteUrl}/`, logo: `${siteUrl}/images/logo.jpeg`, foundingDate: "2021", email: "info@ekatvabharatfoundation.com",
  telephone: "+919272799605",
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  description: "A Pune-based Section 8 nonprofit focused on practical learning, community care and opportunities for independent lives.",
};
function output(path, seo) {
  const url = `${siteUrl}${path}`;
  const graph = [organization, {"@type":"WebSite", "@id":`${siteUrl}/#website`,url:`${siteUrl}/`,name:siteName,publisher:{"@id":organization["@id"]}},
    {"@type": path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : "WebPage", "@id":`${url}#webpage`,url,name:seo.title,description:seo.description,isPartOf:{"@id":`${siteUrl}/#website`},about:{"@id":organization["@id"]},inLanguage:"en"}];
  if (path !== "/") graph.push({"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:`${siteUrl}/`},{"@type":"ListItem",position:2,name:seo.label,item:url}]});
  const metadata = `
    <meta name="robots" content="${seo.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}" />
    ${seo.noindex ? "" : `<link rel="canonical" href="${url}" />`}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${siteName}" />
    <meta property="og:title" content="${escape(seo.title)}" />
    <meta property="og:description" content="${escape(seo.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${siteUrl}/images/logo.jpeg" />
    <meta property="og:image:alt" content="Ekatvabharat Foundation logo" />
    <meta property="og:image:width" content="425" />
    <meta property="og:image:height" content="425" />
    <meta name="twitter:image" content="${siteUrl}/images/logo.jpeg" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escape(seo.title)}" />
    <meta name="twitter:description" content="${escape(seo.description)}" />
    ${seo.noindex ? "" : `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":graph}).replaceAll("<","\\u003c")}</script>`}
  `;
  return template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(seo.title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*/, `$1${escape(seo.description)}`)
    .replace("</head>", metadata + "</head>")
    .replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`);
}
for (const [path, seo] of Object.entries(seoPages)) {
  const dir = path === "/" ? "dist" : `dist${path}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, output(path, seo));
}
await writeFile("dist/404.html", output("/404", missingSeo));
const urls = Object.entries(seoPages).filter(([,seo]) => !seo.noindex).map(([path]) => `${siteUrl}${path}`);
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${escape(url)}</loc></url>`).join("\n")}\n</urlset>\n`);
await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await rm(".prerender", {recursive: true, force: true});
console.log(`Prerendered ${Object.keys(seoPages).length} pages plus 404; generated sitemap and robots.txt.`);
