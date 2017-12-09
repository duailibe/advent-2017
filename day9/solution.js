const fs = require("fs");
const path = require("path");

const INPUT = fs
  .readFileSync(path.join(__dirname, "input"), "utf-8")
  .trim();

function run() {
  const length = INPUT.length;
  let i = 0;

  function next() {
    return INPUT.charAt(i++);
  }

  let curr = 0;
  let groups = 0;
  let canceled = 0;
  while (i < length) {
    let char = next();

    if (char === "<") {
      while ((char = next()) !== ">") {
        if (char === "!") next();
        else canceled++;
      }
      char = next();
    }

    switch (char) {
      case "{":
        curr++;
        break;
      case "}":
        groups += curr--;
        break;
    }
  }

  return [groups, canceled];
}

const result = run();
console.log("Part 1 answer:", result[0]);
console.log("Part 2 answer:", result[1]);
