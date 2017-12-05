const fs = require("fs");
const path = require("path");

const INPUT = fs
  .readFileSync(path.join(__dirname, "input"), "utf-8")
  .trim()
  .split("\n")
  .map(x => parseInt(x, 10));

function countSteps(inc) {
  let curr = 0;
  let count = 0;
  const input = INPUT.slice();
  while (curr < input.length && curr >= 0) {
    const steps = input[curr];
    input[curr] = inc(input[curr]);
    curr += steps;
    count++;
  }
  return count;
}

console.log("Part 1:", countSteps(x => x + 1));
console.log("Part 2:", countSteps(x => x >= 3 ? x - 1 : x + 1));
