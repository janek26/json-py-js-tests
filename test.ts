import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";
import { readFile, writeFile } from "fs/promises";

import { parse, stringify } from "json-bigint";

async function main() {
  const data = await readFile("mock.json", "utf-8");
  const jsonData = stringify(parse(data))
    // replace ":" with ": " (add space after colon) if not inside quotes
    .replace(/:(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/g, ": ")
    // replace "," with ", " (add space after comma) if not inside quotes
    .replace(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/g, ", ");

  // write to file
  await writeFile("transformed-js.json", jsonData);

  // hex output of sha256 hash
  console.log(bytesToHex(sha256(jsonData)));
}

main();
