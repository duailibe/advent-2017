function judge() {
  return A.toString(2).slice(-16) === B.toString(2).slice(-16) ? 1 : 0;
}

var A = 591;
var B = 393;

var result = 0;
for (var i = 0; i < 40000000; i++) {
  result += (A & 0xffff) === (B & 0xffff);
  A = (A * 16807) % 2147483647;
  B = (B * 48271) % 2147483647;
}

console.log("Part 1 answer:", result);

var A = 591;
var B = 393;

var result = 0;
for (var i = 0; i < 5000000; i++) {
  result += (A & 0xffff) === (B & 0xffff);
  do {
    A = (A * 16807) % 2147483647;
  } while (A % 4 !== 0);
  do {
    B = (B * 48271) % 2147483647;
  } while (B % 8 !== 0);
}

console.log("Part 2 answer:", result);
