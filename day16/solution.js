const fs = require("fs");
const path = require("path");

const INPUT = fs.readFileSync(path.join(__dirname, "input"), "utf-8").trim();

const moves = INPUT.split(",");

function dance(curr, move) {
  switch (move.charAt(0)) {
    case "s": {
      const n = curr.length - parseInt(move.slice(1), 10);
      return curr.slice(n) + curr.slice(0, n);
    }

    case "x": {
      const [one, other] = move
        .slice(1)
        .split("/")
        .map(x => parseInt(x, 10));
      move = "p" + curr.charAt(one) + "/" + curr.charAt(other);
    }

    case "p": {
      const [one, other] = move.slice(1).split("/");
      return curr
        .replace(one, "1")
        .replace(other, "2")
        .replace("1", other)
        .replace("2", one);
    }
  }
}

function dance2(curr, move) {
  const next = dance(curr, move);
  if (curr.length !== next.length) {
    console.log("ERROR", { curr, move, next });
    throw new Error();
  }
  return next;
}

console.log("Part 1 answer:", moves.reduce(dance2, "abcdefghijklmnop"));

let res = "abcdefghijklmnop";
let i = 0;
do {
  res = moves.reduce(dance2, res);
  i++;
} while (res !== "abcdefghijklmnop");

let times = 1e9 % i;
res = "abcdefghijklmnop";
while (times-- > 0) {
  res = moves.reduce(dance2, res);
}
console.log("Part 2 answer:", res);
