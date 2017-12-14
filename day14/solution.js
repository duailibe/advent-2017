function getGrid(input) {
  const grid = [];
  for (var i = 0; i < 128; i++) {
    const hash = getHash(input + "-" + i.toString());
    grid.push(
      Array.from(
        Array.from(hash)
          .map(c => zeroPad(parseInt(c, 16).toString(2), 4))
          .join("")
      )
    );
  }
  return grid;
}

const grid = getGrid("jxqlasbh");
console.log(
  "Part 1 answer:",
  grid.reduce((acc, l) => {
    for (var i = 0; i < 128; i++) {
      if (l[i] === "1") acc++;
    }
    return acc;
  }, 0)
);

function removeGroup(i, j) {
  if (!(i > -1 && i < 128 && j > -1 && j < 128)) return;
  if (grid[i][j] !== "1") return;
  grid[i][j] = "-";
  removeGroup(i - 1, j);
  removeGroup(i + 1, j);
  removeGroup(i, j - 1);
  removeGroup(i, j + 1);
}

let groups = 0;
for (var i = 0; i < 128; i++) {
  for (var j = 0; j < 128; j++) {
    if (grid[i][j] === "1") {
      groups++;
      removeGroup(i, j);
    }
  }
}

console.log("Part 2 answer:", groups);

/**
 * from day 10
 */
function knot(lengths, n) {
  const list = Array(256);
  for (var i = 0; i < 256; i++) {
    list[i] = i;
  }

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

function zeroPad(string, length) {
  return "0".repeat(length - string.length) + string;
}

function getHash(string) {
  const spare = knot(
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
    result += zeroPad(number, 2);
    // result += (number.length === 1 ? "0" : "") + number;
  }
  return result;
}
