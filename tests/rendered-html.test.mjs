import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("renders Noor's portfolio metadata and primary content", async () => {
  const html = await readFile(new URL("dist/client/index.html", root), "utf8");
  assert.match(html, /Noor-ul-Ain Khalid/);
  assert.match(html, /Creative Web Developer/);
  assert.match(html, /noorulain5075@gmail\.com/);
  assert.match(html, /linkedin\.com\/in\/noor-khalid-a606aa354/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("emits a branded static 404 and search-engine controls", async () => {
  const [notFound, robots, sitemap] = await Promise.all([
    readFile(new URL("dist/client/404.html", root), "utf8"),
    readFile(new URL("dist/client/robots.txt", root), "utf8"),
    readFile(new URL("dist/client/sitemap.xml", root), "utf8"),
  ]);
  assert.match(notFound, /Lost in space/);
  assert.match(robots, /User-Agent:\s*\*/i);
  assert.match(sitemap, /https:\/\/noorulain\.dev/);
});

test("includes hardened Vercel response headers", async () => {
  const config = JSON.parse(await readFile(new URL("vercel.json", root), "utf8"));
  const headers = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]));
  assert.match(headers["Content-Security-Policy"], /frame-ancestors 'none'/);
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.equal(headers["X-Frame-Options"], "DENY");
  assert.match(headers["Strict-Transport-Security"], /includeSubDomains/);
});
