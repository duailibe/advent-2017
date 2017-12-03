function getDistance(number) {
  const nextRoot = Math.ceil(Math.sqrt(number));
  const nextSquare = Math.pow(nextRoot, 2);
  const perimeter = Math.floor(nextRoot / 2);
  const delta = Math.ceil(nextRoot / 2) - 1;
  const perimeterCenters = [nextSquare - delta, nextSquare - 3 * delta];
  return (
    Math.min(
      Math.abs(number - perimeterCenters[0]),
      Math.abs(number - perimeterCenters[1])
    ) + perimeter
  );
}

function walk(cb) {
  let x = 0;
  let y = 0;
  let dir = "right";
  let size = 0;
  while (cb({ x, y })) {
    switch (dir) {
      case "right":
        x++;
        if (x > size) {
          size++;
          dir = "up";
        }
        break;
      case "left":
        x--;
        if (-x === size) {
          dir = "down";
        }
        break;
      case "up":
        y++;
        if (y === size) {
          dir = "left";
        }
        break;
      case "down":
        y--;
        if (-y === size) {
          dir = "right";
        }
        break;
    }
  }
  return { x, y };
}

function getDistance2(number) {
  let curr = 1;
  const { x, y } = walk(() => curr++ < number);
  return Math.abs(x) + Math.abs(y);
}

function firstBigger(number) {
  let map = { "0,0": 1 };
  const { x, y } = walk(({ x, y }) => {
    let newVal = 0;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        newVal += map[`${x + i},${y + j}`] || 0;
      }
    }
    map[`${x},${y}`] = newVal;
    return newVal <= number;
  });
  return map[`${x},${y}`];
}

console.log("First half answer:", getDistance(265149));
console.log("First half answer:", getDistance2(265149));
console.log("Second half answer:", firstBigger(265149));
