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

    console.log({ startNode, endNode });
  }

  clone(object) {
    return JSON.parse(JSON.stringify(object));
  }
};
