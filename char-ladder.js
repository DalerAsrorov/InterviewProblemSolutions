const assertEqual = require('./assert');

const SAMPLE = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O', 'E', 'L', 'A', 'D']
];

const SAMPLE2 = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A', 'F'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'D', 'H'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A', 'L'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A', 'L']
];

// I B C A L K A
// D R F C A E A
// G H O E L A D

// Output: IROCLED

const chooseNextStep = (step, reachedBottom, rows, columns) => {
  let [y, x] = step;

  if (!reachedBottom) {
    y += 1;
  } else {
    y -= 1;
  }

  if (y === 0) {
    reachedBottom = false;
  } else if (y === rows - 1) {
    reachedBottom = true;
  }

  x += 1;

  return [y, x, reachedBottom];
};

const getSecret = letterGrid => {
  const rows = letterGrid.length;
  const columns = letterGrid[0].length;
  let stepsQueue = [[0, 0]]; // take first step
  let x,
    y,
    reachedBottom = false;

  while (stepsQueue.length < columns) {
    let lastStep = stepsQueue[stepsQueue.length - 1];

    [y, x, reachedBottom] = chooseNextStep(
      lastStep,
      reachedBottom,
      rows,
      columns
    );

    stepsQueue.push([y, x]);
  }

  return stepsQueue.reduce(
    (accum, [yVal, xVal]) => accum + letterGrid[yVal][xVal],
    ''
  );
};

console.log(
  assertEqual('Secret letter result is ', getSecret(SAMPLE), 'IROCLED')
);

console.log(getSecret(SAMPLE2));
