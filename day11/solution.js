const fs = require("fs");
const path = require("path");

const INPUT = fs.readFileSync(path.join(__dirname, "input"), "utf-8").trim();

function walk(steps) {
  let maxDistance = 0;
  const final = steps.reduce(
    ([x, y, z], step) => {
      maxDistance = Math.max(maxDistance, distance(x, y, z));
      switch (step) {
        case "nw":
          return [x - 1, y + 1, z];
        case "ne":
          return [x + 1, y, z - 1];
        case "n":
          return [x, y + 1, z - 1];
        case "sw":
          return [x - 1, y, z + 1];
        case "se":
          return [x + 1, y - 1, z];
        case "s":
          return [x, y - 1, z + 1];
      }
    },
    [0, 0, 0]
  );
  const last = distance(final[0], final[1], final[2]);
  return [last, Math.max(last, maxDistance)];
}

function distance(x, y, z) {
  return (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
}

const res = walk(INPUT.split(","));
console.log("Part 1 answer:", res[0]);
console.log("Part 2 answer:", res[1]);
