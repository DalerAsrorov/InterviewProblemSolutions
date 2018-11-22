const ROWS = 5;
const COLUMNS = 5;

const TEST = [
  ['white', 'white', 'white', 'white', 'white'],
  ['black', 'white', 'white', 'white', 'black'],
  ['black', 'white', 'white', 'white', 'black'],
  ['black', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white']
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

  return {
    up,
    down,
    left,
    right
  };
};

const assignKey = (i, j) => `${i}-${j}`;

const capture = (grid, row, column) => {
  const val = grid[column][row]; // (column, row) = (x, y)
  let marked = {};
  let limit = 4;

  if (val === 'black') {
    let queue = [[column, row]];

    while (queue.length !== 0) {
      let [x, y] = queue.shift();

      marked[assignKey(x, y)] = grid[x][y];
      const neighbors = getNeighbors([x, y]);

      Object.keys(neighbors).forEach(neighborDir => {
        const [x, y] = neighbors[neighborDir];
        const val = grid[x][y];

        if (!marked[assignKey(x, y)]) {
          if (!grid[x][y] || grid[x][y] === 'white') {
            limit = limit - 1;
          } else {
            queue.push([x, y]);
          }
        }

        marked[assignKey(x, y)] = grid[x][y];
      });

      if (limit === 0) {
        return true;
      }
    }
  }

  return false;
};

// const grid = generateGrid(ROWS, COLUMNS);
const grid = TEST;

// assignRandomBlackTiles(grid, ROWS, COLUMNS);

let result = capture(grid, 4, 1);

console.log(grid, result);
