module.exports = function generateObstacles(grid, num = 3) {
  const rows = grid.length;
  const columns = grid[0] ? grid[0].length : 0;
  let obstacles = [];

  for (let i = 0; i < num; i++) {
    const row = Math.floor(Math.random() * rows);
    const column = Math.floor(Math.random() * columns);

    obstacles.push([column, row]);
  }

  for (let i = 0; i < obstacles.length; i++) {
    const [column, row] = obstacles[i];

    grid[row][column] = 0;
  }

  return obstacles;
};
