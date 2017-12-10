const INPUT = "206,63,255,131,65,80,238,157,254,24,133,2,16,0,1,3";

function buildList() {
  const list = Array(256);
  for (var i = 0; i < 256; i++) {
    list[i] = i;
  }
  return list;
}

function knot(list, lengths, n) {
  let cursor = 0;
  let skip = 0;

  while (n-- > 0) {
    const _lengths = lengths.slice();

    while (_lengths.length) {
      const length = _lengths.shift();

      const rest = cursor + length > 256 ? cursor + length - 256 : 0;
      let sublist = list
        .slice(cursor, cursor + length - rest)
        .concat(list.slice(0, rest));

      sublist.reverse();

      list.splice(cursor, length - rest, ...sublist.slice(0, length - rest));
      list.splice(0, rest, ...sublist.slice(length - rest));

      cursor = (cursor + length + skip) % 256;
      skip += 1;
    }
  }

  return list;
}

function getHash(string) {
  const spare = knot(
    buildList(),
    string
      .split("")
      .map(x => x.charCodeAt(0))
      .concat([17, 31, 73, 47, 23]),
    64
  );
  let result = "";
  for (var i = 0; i < 16; i++) {
    const number = spare
      .slice(i * 16, (i + 1) * 16)
      .reduce((res, n) => res ^ n, 0)
      .toString(16);
    result += (number.length === 1 ? "0" : "") + number;
  }
  return result;
}

const lengths1 = INPUT.split(",").map(x => parseInt(x, 10));
const result1 = knot(buildList(), lengths1, 1);
console.log("Part 1 answer:", result1[0] * result1[1]);

console.log("Part 2 answer:", getHash(INPUT));
