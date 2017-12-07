const fs = require("fs");
const path = require("path");

const INPUT = fs
  .readFileSync(path.join(__dirname, "input"), "utf-8")
  .trim()
  .split("\n");

function getPrograms() {
  return INPUT.reduce((programs, line) => {
    line = line.split(/[\s,]+/);
    programs[line[0]] = {
      weight: parseInt(line[1].replace(/[()]/g, ""), 10),
      above: line.length > 2 ? line.slice(3) : []
    };
    return programs;
  }, {});
}

function deleteAbove(programs, name) {
  if (!programs[name]) return;
  programs[name].above.forEach(n => {
    deleteAbove(programs, n);
    delete programs[n];
  });
}

function getBottom(programs) {
  const names = Object.keys(programs);
  const candidates = new Set(names);
  names.forEach(n => {
    programs[n].above.forEach(na => {
      candidates.delete(na);
    });
  });
  return Array.from(candidates)[0];
}

function getWeight(programs, name) {
  return programs[name].above.reduce(
    (weight, n) => weight + getWeight(programs, n),
    programs[name].weight
  );
}

function getWrongWeight(programs, name) {
  const weights = programs[name].above.reduce((acc, ab) => {
    const weight = getWeight(programs, ab);
    if (!acc[weight]) {
      acc[weight] = [];
    }
    acc[weight].push(ab);
    return acc;
  }, {});
  if (Object.values(weights).length === 1) {
    return name;
  }
  const wrongWeight = Object.keys(weights).find(w => weights[w].length === 1);
  const wrong = weights[wrongWeight][0];
  delete weights[wrongWeight]
  const rightWeight = Object.keys(weights)[0]
  const diff = rightWeight - wrongWeight;
  console.log(diff)
  return getWrongWeight(programs, wrong);
}

const programs = getPrograms();
const bottom = getBottom(programs);
console.log("First half answer:", bottom);
console.log(programs[getWrongWeight(programs, bottom)]);
