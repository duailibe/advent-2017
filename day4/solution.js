const fs = require("fs");
const path = require("path");

const INPUT = fs
  .readFileSync(path.join(__dirname, "input"), "utf-8")
  .trim()
  .split("\n");

function isValid1(passphrase) {
  const words = passphrase.split(/\s+/).sort();
  for (var i = 1; i < words.length; i++) {
    if (words[i - 1] === words[i]) return false;
  }
  return true;
}

function isValid2(passphrase) {
  let words = passphrase
    .split(/\s+/)
    .map(w =>
      w
        .split("")
        .sort()
        .join("")
    )
    .sort();
  for (var i = 1; i < words.length; i++) {
    if (words[i - 1] === words[i]) return false;
  }
  return true;
}

function count(check) {
  return INPUT.reduce(
    (count, passphrase) =>
      check(passphrase) ? count + 1 : count,
    0
  );
}

console.log("First half answer:", count(isValid1));
console.log("First half answer:", count(isValid2));
