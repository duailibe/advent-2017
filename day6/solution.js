const INPUT = "5 1 10  0 1 7 13  14  3 12  8 10  7 12  0 6";

const banks = INPUT.split(/\s+/).map(x => parseInt(x, 10));
const previous = {};

function cycle() {
  let max = 0;
  for (var i = 1; i < banks.length; i++) {
    if (banks[i] > banks[max]) {
      max = i;
    }
  }
  var blocks = banks[max];
  var j = max;
  while (blocks-- > 0) {
    banks[max]--;
    j = (j + 1) % banks.length;
    banks[j]++;
  }
}

function getSteps() {
  var count = 0;
  while (!(banks.join() in previous)) {
    previous[banks.join()] = count++;
    cycle();
  }
  return [count, count - previous[banks.join()]];
}

const answer = getSteps();
console.log("Part 1 answer:", answer[0]);
console.log("Part 2 answer:", answer[1]);
