import { sha256 } from "@noble/hashes/sha256";
import { bytesToHex } from "@noble/hashes/utils";
import { readFile, writeFile } from "fs/promises";

import { parse, stringify } from "json-bigint";

async function main() {
  const data = await readFile("mock.json", "utf-8");
  const jsonData = stringify(parse(data))
    .split("")
    .reduce<[boolean, string]>(
      ([insideQuotes, newString], char) => {
        if (char === '"' && newString[newString.length - 1] !== "\\") {
          // ignore escaped quotes
          insideQuotes = !insideQuotes;
        }
        if (insideQuotes) {
          newString += char;
          return [insideQuotes, newString];
        }
        if (char === ":" && !insideQuotes) {
          newString += ": ";
        } else if (char === "," && !insideQuotes) {
          newString += ", ";
        } else {
          newString += char;
        }
        return [insideQuotes, newString];
      },
      [false, ""]
    )[1];

  // write to file
  await writeFile("transformed-js.json", jsonData);

  // hex output of sha256 hash
  console.log(bytesToHex(sha256(jsonData)));
}

main();
