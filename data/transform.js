import { armorData } from "./armorData.js";
import fs from "fs";

function transformArmorData(data) {
  const result = {};

  for (const className in data) {
    result[className] = {};

    for (const setName in data[className]) {
      const set = data[className][setName];
      result[className][setName] = {};

      for (const pieceName in set) {
        result[className][setName][pieceName] = {
          options: set[pieceName],
          collected: false,
          collectedPlace: null,
        };
      }
    }
  }

  return result;
}

const transformed = transformArmorData(armorData);

fs.writeFileSync("output.json", JSON.stringify(transformed, null, 2));

console.log("✔ Done!");
