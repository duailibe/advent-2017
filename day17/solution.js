// input
const steps = 354;

let buffer = [0, 1];
let index = 1;
for (var i = 2; i < 2018; i++) {
  index = (index + steps) % i;
  index++;
  buffer.splice(index, 0, i);
}

console.log("Part 1 answer:", buffer[index + 1]);

index = 1;
val = 0;
for (var i = 2; i < 5e7 + 1; i++) {
  index = (index + steps) % i;
  index++;
  if (index === 1) val = i;
}

console.log("Part 2 answer:", val);
