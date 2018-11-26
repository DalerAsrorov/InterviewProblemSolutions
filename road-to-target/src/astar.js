const Node = require('./node');

module.exports = class AStar {
  constructor(grid = []) {
    if (grid.length > 0) {
      this.grid = this.clone(grid);

      this.init(grid);
    }
  }

  isEmpty() {
    return this.grid ? this.grid.length > 0 : true;
  }

  init(originalGrid) {
    this.grid = this.isEmpty() ? this.clone(originalGrid) : this.grid;

    const rows = this.getRows();
    const columns = this.getColumns();

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        this.grid[y][x] = new Node({
          value: originalGrid[y][x],
          position: {
            x,
            y
          }
        });
      }
    }
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

  getRows() {
    return this.grid.length;
  }

  getColumns() {
    return this.grid[0] ? this.grid[0].length : 0;
  }

  printGrid() {
    for (let y = 0; y < this.getRows(); y++) {
      let str = '';
      for (let x = 0; x < this.getColumns(); x++) {
        const node = this.grid[y][x];
        str += `${node.value}\t`;
      }

      console.log(str);
    }
  }

  search(start, target) {
    this._validateInputs(start, target);

    const [x1, y1] = start;
    const [x2, y2] = target;
    const startNode = this.grid[y1][x1];
    const targetNode = this.grid[y2][x2];
    let openList = [];
    let closeList = [];

    // add the start node to OPEN list
    openList.push(startNode);

    while (openList.length > 0) {
      let lowestFxNodeIndex = 0;

      for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowestFxNodeIndex].f) {
          lowestFxNodeIndex = i;
        }
      }

      let currentNode = openList[lowestFxNodeIndex];

      // remove current from OPEN list
      this.removeGraphNode(openList, currentNode);
      // add current to CLOSE list
      closeList.push(currentNode);

      // if current node is equal to target node
      // return the path trace
      if (this.areNodesEqual(currentNode, targetNode)) {
        return this.getTrace(currentNode);
      }

      const neighbors = this.getNeighbors(currentNode);

      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];

        // if neighbor is not traversable or in CLOSE list, skip it
        if (this.findNode(closeList, neighbor) || this.isObstacle(neighbor)) {
          continue;
        }

        let gScore = currentNode.g + 1;
        let isOptimalScore = false;

        if (!this.findNode(openList, neighbor)) {
          isOptimalScore = true;
          neighbor.h = this.getH(neighbor, targetNode);
          openList.push(neighbor);
        } else if (gScore < neighbor.g) {
          isOptimalScore = true;
        }

        if (isOptimalScore) {
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = currentNode;
        }
      }
    }

    // no path from start to target was found
    return null;
  }

  _validateInputs(start, end) {
    if (
      !start ||
      (start && start.length < 2) ||
      !end ||
      (end && end.length < 2)
    ) {
      throw Error(
        'Should provide validat start and destination nodes in a [x1, y1], [x2, y2] formats.'
      );
    }
  }

  isObstacle(node, obstacleValue = 0) {
    return node.value === obstacleValue;
  }

  findNode(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (this.areNodesEqual(list[i], node)) {
        return list[i];
        break;
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

  removeGraphNode(list, node) {
    for (let i = 0; i < list.length; i++) {
      if (this.areNodesEqual(list[i], node)) {
        list.splice(i, 1);
        break;
      }
    }
  }

  getH(nodeA, nodeB) {
    const {
      position: { x: x1, y: y1 }
    } = nodeA;
    const {
      position: { x: x2, y: y2 }
    } = nodeB;

    const a2 = Math.pow(x1 - x2, 2);
    const b2 = Math.pow(y1 - y2, 2);

    return Math.sqrt(a2 + b2);
  }

  getNeighbors(node) {
    const { x, y } = node.position;
    let neighbors = [];

    // left
    if (this.grid[y] && this.grid[y][x - 1]) {
      neighbors.push(this.grid[y][x - 1]);
    }
    // right
    if (this.grid[y] && this.grid[y][x + 1]) {
      neighbors.push(this.grid[y][x + 1]);
    }
    // up
    if (this.grid[y - 1] && this.grid[y - 1][x]) {
      neighbors.push(this.grid[y - 1][x]);
    }
    // down
    if (this.grid[y + 1] && this.grid[y + 1][x]) {
      neighbors.push(this.grid[y + 1][x]);
    }

    // diagonals

    // up-left
    if (this.grid[y - 1] && this.grid[y - 1][x - 1]) {
      neighbors.push(this.grid[y - 1][x - 1]);
    }
    // up-right
    if (this.grid[y - 1] && this.grid[y - 1][x + 1]) {
      neighbors.push(this.grid[y - 1][x + 1]);
    }
    // down-left
    if (this.grid[y + 1] && this.grid[y + 1][x - 1]) {
      neighbors.push(this.grid[y + 1][x - 1]);
    }
    // down-right
    if (this.grid[y + 1] && this.grid[y + 1][x + 1]) {
      neighbors.push(this.grid[y + 1][x + 1]);
    }

    return neighbors;
  }

  clone(object) {
    return JSON.parse(JSON.stringify(object));
  }
};
