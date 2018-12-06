const ROWS = 5;
const COLUMNS = 5;

const TEST = [
  ['white', 'white', 'white', 'white', 'white'],
  ['black', 'white', 'white', 'white', 'black'],
  ['black', 'white', 'white', '11111', '11111'],
  ['black', 'white', 'white', 'black', 'black'],
  ['white', 'white', 'white', 'black', 'black']
];

const generateGrid = (m, n) => {
  let grid = [];

  for (let i = 0; i < m; i++) {
    let rows = [];
    for (let j = 0; j < n; j++) {
      rows.push('white');
    }

    grid.push(rows);
  }
  return grid;
};

const assignRandomBlackTiles = (grid, rows, columns, num = 5) => {
  for (let i = 0; i < num; i++) {
    const row = Math.floor(Math.random() * rows);
    const column = Math.floor(Math.random() * columns);

    grid[row][column] = 'black';
  }
};

const getNeighbors = coords => {
  const [x, y] = coords;

  const left = [x, y - 1];
  const right = [x, y + 1];
  const up = [x - 1, y];
  const down = [x + 1, y];

  return [up, down, left, right];
};

const assignKey = (i, j) => `${i}-${j}`;

const MAX = 4;

const wasVisited = (visitedList, coords) => {
  if (coords) {
    const [x2, y2] = coords;
    for (let i = 0; i < visitedList.length; i++) {
      const [x1, y1] = visitedList[i];

      if (x1 == x2 && y1 == y2) {
        return true;
      }
    }
  }

  return false;
};

const capture = (grid, row, column) => {
  let marked = {};
  let stack = [[column, row]];
  let visitedList = [];
  let remaining = MAX;

  while (stack.length > 0) {
    let [x, y] = stack.pop();
    let neighbors = getNeighbors([x, y]);
    remaining = MAX;
    visitedList.push([x, y]);

    neighbors.forEach(neighbor => {
      const neighborValue =
        grid[neighbor[0]] && grid[neighbor[0]][neighbor[1]]
          ? grid[neighbor[0]][neighbor[1]]
          : null;

      if (
        !neighborValue ||
        neighborValue === 'white' ||
        (neighborValue === 'black' && wasVisited(visitedList, neighbor))
      ) {
        remaining -= 1;
      } else if (
        neighborValue === 'black' &&
        !wasVisited(visitedList, neighbor)
      ) {
        stack.push([neighbor[0], neighbor[1]]);
      }

      visitedList.push(neighbor);
    });
  }

  return remaining === 0;
};

// const grid = generateGrid(ROWS, COLUMNS);
const grid = TEST;

// assignRandomBlackTiles(grid, ROWS, COLUMNS);

let result = capture(grid, 3, 3);

console.log(grid, result);
