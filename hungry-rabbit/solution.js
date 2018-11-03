const assertEqual = require('../assert');
const testCases = require('./test-cases');

const getValueAt = (matrix, x, y) =>
  matrix[y] && matrix[y][x] ? matrix[y][x] : 0;

const getCenterList = size => {
  let centers = [];

  if (size % 2 !== 0) {
    centers = [Math.ceil(size / 2) - 1];
  } else if (size % 2 === 0) {
    centers = [size / 2 - 1, size / 2];
  }

  return centers;
};

const getMaxCenter = (matrix, nCols, nRows) => {
  const xCenters = getCenterList(nCols);
  const yCenters = getCenterList(nRows);
  let xMaxCoord = xCenters[0],
    yMaxCoord = yCenters[0];
  let max = getValueAt(matrix, xMaxCoord, yMaxCoord);

  for (let j = 0; j < yCenters.length; j++) {
    for (let i = 0; i < xCenters.length; i++) {
      const valueAtCoord = getValueAt(matrix, xCenters[i], yCenters[j]);
      if (max < valueAtCoord) {
        max = valueAtCoord;
        [xMaxCoord, yMaxCoord] = [xCenters[i], yCenters[j]];
      }
    }
  }

  return { x: xMaxCoord, y: yMaxCoord };
};

const getNextMaxStep = (matrix, steps) =>
  steps.reduce((accum, currentStep) => {
    let currentStepValue = getValueAt(matrix, currentStep[0], currentStep[1]);
    let accumStepValue = getValueAt(matrix, accum[0], accum[1]);

    if (currentStepValue > accumStepValue) {
      accum = [currentStep[0], currentStep[1]];
    }

    return accum;
  }, steps[0]);

// x - represents coords according to column indexes
// y - represents coords according to row indexes
const calculateEatenCarrots = matrix => {
  const nRows = matrix.length;
  const nCols = matrix[0].length;
  let { x, y } = getCenterMax(matrix, nCols, nRows);
  let isAsleep = false;
  let sum = 0;

  while (!isAsleep) {
    const curr = getValueAt(matrix, x, y);
    sum += curr;

    const stepUp = [x, y - 1];
    const stepDown = [x, y + 1];
    const stepLeft = [x - 1, y];
    const stepRight = [x + 1, y];

    const steps = [stepUp, stepDown, stepLeft, stepRight];
    const maxData = getNextMaxStep(matrix, steps);

    // set the value of the square with taken carrots to 0
    matrix[y][x] = 0;

    x = maxData[0];
    y = maxData[1];

    const nextMaxValue = getValueAt(matrix, x, y);

    if (nextMaxValue === 0) {
      isAsleep = true;
    }
  }

  return sum;
};

console.log(assertEqual('test1', calculateEatenCarrots(testCases.MATRIX1), 27));
console.log(assertEqual('test2', calculateEatenCarrots(testCases.MATRIX2), 64));
console.log(assertEqual('test3', calculateEatenCarrots(testCases.MATRIX3), 10));
