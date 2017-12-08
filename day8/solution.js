const fs = require("fs");
const path = require("path");

const INPUT = fs
  .readFileSync(path.join(__dirname, "input"), "utf-8")
  .trim()
  .split("\n");

function parseLine(line) {
  const parts = line.split(/\s+/);
  return {
    register: parts[0],
    cmd: parts[1],
    delta: parseInt(parts[2], 10),
    cond: {
      register: parts[4],
      comp: parts[5],
      value: parseInt(parts[6], 10)
    }
  };
}

function checkCond(registers, cond) {
  const currValue = registers[cond.register];
  return eval("currValue " + cond.comp + " cond.value");
}

function run() {
  let max = 0;
  const registers = INPUT.map(parseLine).reduce((registers, inst) => {
    if (!(inst.register in registers)) registers[inst.register] = 0;
    if (!(inst.cond.register in registers)) registers[inst.cond.register] = 0;

    if (checkCond(registers, inst.cond)) {
      let newVal = registers[inst.register] += (inst.cmd === "inc" ? 1 : -1) * inst.delta;
      if (newVal > max) max = newVal;
    }

    return registers;
  }, {});
  return [Math.max(...Object.values(registers)), max];
}

const result = run();
console.log("Part 1 answer:", result[0]);
console.log("Part 2 answer:", result[1]);
