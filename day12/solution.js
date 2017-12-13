const fs = require("fs");
const path = require("path");

const INPUT = fs.readFileSync(path.join(__dirname, "input"), "utf-8").trim();

function parse() {
  const lines = INPUT.split(/\n/).map(x => x.split(/[^0-9]+/g));
  const map = {};
  for (var i = 0; i < lines.length; i++) {
    map[lines[i][0]] = lines[i].slice(1);
  }
  return map;
}

function getGroup(map, start) {
  const visited = {};
  const queue = [start];
  while (queue.length) {
    const curr = queue.shift();
    visited[curr] = true;
    map[curr].forEach(next => {
      if (next in visited) return;
      queue.push(next);
    });
  }
  return Object.keys(visited);
}

function groupCount(map) {
  const programIds = Object.keys(map);
  const visited = {}
  let count = 0;
  while (programIds.length) {
    const curr = programIds.shift();
    if (curr in visited) continue;
    count++;
    getGroup(map, curr).forEach(el => {
      visited[el] = true;
    })
  }
  return count;
}

const map = parse();
const group0 = getGroup(map, "0");
console.log("Part 1 answer:", group0.length);
console.log("Part 2 answer:", groupCount(map));
