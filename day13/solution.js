const fs = require("fs");
const path = require("path");

const INPUT = fs.readFileSync(path.join(__dirname, "input"), "utf-8").trim();

const layers = INPUT.split(/\n/).map(l =>
  l.split(/:\s/g).map(x => parseInt(x, 10))
);

function caught(range, time) {
  return time % (2 * (range - 1)) === 0;
}

function nowait() {
  return layers.reduce((severity, [depth, range]) => {
    if (caught(range, depth)) {
      return severity + depth * range;
    }
    return severity;
  }, 0);
}

function check(delay) {
  return layers.some(([depth, range]) => caught(range, delay + depth))
}

console.log("Part 1 answer:", nowait());

let delay = 0;
while (check(++delay)) continue;
console.log("Part 2 answer:", delay);
