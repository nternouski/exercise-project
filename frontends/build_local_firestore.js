const os = require("os");
const fs = require("fs");

const ip = Object.values(os.networkInterfaces())
  .map((v) => v.map((i) => i.address))
  .flat()
  .find((ip) => ip.startsWith("192"));
console.log("************************************************");
console.log(`disponible para la red local en ip: ${ip}`);
console.log("************************************************");
const fname = "./environments/local_firestore.ts";

if (!fs.existsSync(fname)) {
  console.log("\n\n");
  console.log(`==>> El archivo en '${fname}' no existe..`);
  console.log(`\t\t se creará un estos parámetros por default.`);
  console.log("\n\n");
  fs.writeFileSync(fname, `export const firestore = { host: '${ip}', port: 8080, ssl: false };`);
}

const file = fs
  .readFileSync(fname)
  .toString()
  .replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, ip);
fs.writeFileSync(fname, file);
