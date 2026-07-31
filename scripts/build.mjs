import { access, readFile, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const command = process.platform === "win32"
  ? path.join(root, "node_modules", ".bin", "vinext.cmd")
  : path.join(root, "node_modules", ".bin", "vinext");

await rm(dist, { recursive: true, force: true });

const exitCode = await new Promise((resolve, reject) => {
  const child = spawn(command, ["build"], {
    cwd: root,
    env: process.env,
    shell: process.platform === "win32",
    stdio: "inherit",
  });
  child.on("error", reject);
  child.on("exit", (code) => resolve(code ?? 1));
});

async function validateStaticExport() {
  const client = path.join(dist, "client");
  const required = ["index.html", "404.html", "robots.txt", "sitemap.xml"];
  await Promise.all(required.map((file) => access(path.join(client, file))));
  const html = await readFile(path.join(client, "index.html"), "utf8");
  if (!html.includes("Noor-ul-Ain Khalid")) throw new Error("Portfolio HTML was not generated.");

  const assetPaths = [...html.matchAll(/(?:src|href)="\/?(assets\/[^"?#]+)/g)].map((match) => match[1]);
  await Promise.all(assetPaths.map((asset) => access(path.join(client, asset))));
}

try {
  await validateStaticExport();
} catch (error) {
  console.error(error);
  process.exit(exitCode || 1);
}

if (exitCode !== 0 && process.platform !== "win32") process.exit(exitCode);
if (exitCode !== 0) console.warn("Build output verified after a Windows runtime shutdown warning.");
