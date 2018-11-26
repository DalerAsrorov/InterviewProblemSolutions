// Given a grid of characters, starting point, and target point
// find the way to the target

const getColumnLen = grid => grid.length;
const getRowLen = grid => (grid[0] ? grid[0].length : 0);

const generateGrid = (col, row) => {
  let grid = [];

  for (let i = 0; i < row; i++) {
    let rows = [];

    for (let j = 0; j < col; j++) {
      rows.push(1);
    }

    grid.push(rows);
  }

  return grid;
};

const generateObstacles = (grid, num = 3) => {
  let obstacles = [];

  for (let i = 0; i < num; i++) {
    const row = Math.floor(Math.random() * getRowLen(grid));
    const column = Math.floor(Math.random() * getColumnLen(grid));

    obstacles.push([row, column]);
  }

  for (let i = 0; i < obstacles.length; i++) {
    const [row, column] = obstacles[i];

    grid[column][row] = 0;
  }

  return obstacles;
};

const grid = generateGrid(6, 3);
const obstacles = generateObstacles(grid);

class Node {
  constructor({
    f = 0,
    g = 0,
    h = 0,
    value,
    position = [0, 0],
    parent = null
  } = {}) {
    this.f = f;
    this.g = g;
    this.h = h;
    this.position = position;
    this.value = value;
    this.parent = parent;
  }
}

class AStar {
  constructor(grid = []) {
    this.grid = this.copy(grid);

    this.init(grid);
  }

  init(originalGrid) {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[x].length; y++) {
        this.grid[x][y] = new Node({
          value: originalGrid[x][y],
          position: {
            x: y,
            y: x
          }
        });
      }
    }
  }

  printGrid() {
    for (let x = 0; x < this.grid.length; x++) {
      let rowStr = '';
      for (let y = 0; y < this.grid[x].length; y++) {
        rowStr += `\t${this.grid[x][y].value} `;
      }

      console.log(rowStr);
    }
  }

  getEuclideanDistance(start, target) {
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = target;

    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  getTrace(currentNode) {
    let curr = currentNode;
    let trace = [];

    while (curr.parent) {
      trace.push(curr);
      curr = curr.parent;
      console.log(curr.position);
    }

    return trace.reverse();
  }

  // A-star searching algorithm
  search(start, end) {
    console.log(
      `Starting search from (${start[0]}, ${start[1]}) to (${end[0]}, ${
        end[1]
      })`
    );

    const [x1, y1] = start;
    const [x2, y2] = end;
    const startNode = this.grid[x1][y1];
    const endNode = this.grid[x2][y2];
    let openList = [];
    let closedList = [];

    openList.push(startNode);

    let counter = 0;
    while (openList.length > 0) {
      counter++;
      let lowestFxIndex = 0;

      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowestFxIndex].f) {
          lowestFxIndex = [i];
        }
      }
      let currentNode = openList[lowestFxIndex];

      // found destination node
      if (this.areNodesEqual(currentNode, endNode)) {
        return this.getTrace(currentNode);
      }

      // proceed to search
      this.removeGraphNode(openList, currentNode);
      closedList.push(currentNode);

      const neighbors = this.getNeighbors(currentNode);

      console.log(neighbors.length, currentNode, counter);
      if (counter > 2) {
        return;
      }

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        // if node is not valid, skip to next neighbor
        if (
          this.findGraphNode(closedList, neighbor) ||
          this.isNodeObstacle(neighbor)
        ) {
          continue;
        }

        let gScore = currentNode.g + 1;
        let isGScoreBest = false;

        if (!this.findGraphNode(openList, neighbor)) {
          isGScoreBest = true;
          neighbor.h = this.getEuclideanDistance(
            neighbor.position,
            endNode.position
          );
          openList.push(neighbor);
        } else if (gScore < neighbor.g) {
          isGScoreBest = true;
        }

        if (isGScoreBest) {
          neighbor.parent = currentNode;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
      // return;
    }

    return [];
  }

  isNodeObstacle(node) {
    return node.value === 0;
  }

  getNeighbors(currentNode) {
    const neighbors = [];
    const { x: y, y: x } = currentNode.position;
    const grid = this.grid;

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
      neighbors.push(grid[x - 1][y]);
    }
    // East
    if (grid[x + 1] && grid[x + 1][y]) {
      neighbors.push(grid[x + 1][y]);
    }
    // South
    if (grid[x] && grid[x][y - 1]) {
      neighbors.push(grid[x][y - 1]);
    }
    // North
    if (grid[x] && grid[x][y + 1]) {
      neighbors.push(grid[x][y + 1]);
    }

    // Diagonals

    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
      neighbors.push(grid[x - 1][y - 1]);
    }
    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
      neighbors.push(grid[x + 1][y - 1]);
    }
    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
      neighbors.push(grid[x - 1][y + 1]);
    }
    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
      neighbors.push(grid[x + 1][y + 1]);
    }

    return neighbors;
  }

  removeGraphNode(list, node) {
    for (let i = 0; i < list.length; list++) {
      if (this.areNodesEqual(list[i], node)) {
        list.splice(i, 1);
        break;
      }
    }
  }

  findGraphNode(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (this.areNodesEqual(list[i], node)) {
        return list[i];
      }
    }

    return null;
  }

  areNodesEqual(nodeA, nodeB) {
    return (
      nodeA.position.x === nodeB.position.x &&
      nodeA.position.y === nodeB.position.y
    );
  }

  copy(grid) {
    return JSON.parse(JSON.stringify(grid));
  }
}

const astar = new AStar(grid);
astar.printGrid();
astar.search([1, 2], [1, 5]);
