const testCases = require('./test-cases');

const VALUE_MEANING_MAP = {
  target: 9,
  road: 1,
  block: 0
};

const createKey = (i, j) => `${i},${j}`;
const peek = stack => stack[stack.length - 1];
const getAllPossibleSteps = ({ area, step }) => {
  const [i, j] = step;
  const up = [i - 1, j];
  const down = [i + 1, j];
  const right = [i, j + 1];
  const left = [i, j - 1];

  return [up, down, right, left].filter(
    stepCoord =>
      area[stepCoord[0]] &&
      area[stepCoord[0]][stepCoord[1]] &&
      area[stepCoord[0]][stepCoord[1]] > VALUE_MEANING_MAP.block
  );
};
const calcDistance = ({ x1, x2, y1, y2 }) => {
  return Math.sqrt(
    Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2)
  );
};
const getOptimalStepCoords = ({ area, steps, end }) => {
  const [endX, endY] = end;
  let min = calcDistance({
    x1: steps[0][0],
    x2: endX,
    y1: steps[0][1],
    y2: endY
  });
  let coords = [steps[0][0], steps[0][1]];

  for (let i = 1; i < steps.length; i++) {
    let currDistance = calcDistance({
      x1: steps[i][0],
      x2: endX,
      y1: steps[i][1],
      y2: endY
    });

    if (currDistance < min) {
      min = currDistance;
      coords = [steps[i][0], steps[i][1]];
    }
  }

  return coords;
};

const findShortestPath = areaMatrix => {
  const M = areaMatrix.length;
  const N = areaMatrix[0].length;
  let start = [0, 0];
  let end = [];

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (areaMatrix[i][j] === VALUE_MEANING_MAP.target) {
        end = [i, j, areaMatrix[i][j]];
      }
    }
  }

  // start
  let stack = [start];
  let area = [...areaMatrix];
  let wasFound = false;
  let nextStep = [];

  while (!wasFound) {
    const step = peek(stack);
    const possibleSteps = getAllPossibleSteps({
      area,
      step
    });
    const optCoords = getOptimalStepCoords({
      steps: possibleSteps,
      area,
      end
    });

    // mark current step as 0 to decrease incentive for it
    area[step[0]][step[1]] = 0;
    // push the last optimal step to the stack
    stack.push(optCoords);

    if (area[optCoords[0]][optCoords[1]] === VALUE_MEANING_MAP.target) {
      wasFound = true;
    }
  }

  return stack.length - 1;
};

const result1 = findShortestPath(testCases.fourByFour);
