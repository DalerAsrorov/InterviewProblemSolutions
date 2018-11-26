const Node = require('./node');

module.exports = class AStar {
  constructor(grid = []) {
    this.grid = this.clone(grid);

    this.init(grid);
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

  init(originalGrid) {
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

  search(start, destination) {
    const [x1, y1] = start;
    const [x2, y2] = destination;
    const startNode = this.grid[y1][x1];
    const endNode = this.grid[y2][x2];

    let neighbors = this.getNeighbors(startNode);
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
