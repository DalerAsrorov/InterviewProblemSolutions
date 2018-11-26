const generateGrid = require('./generate-grid');
const generateObstacles = require('./generate-obstacles');
const AStar = require('./astar');

const COLUMNS = 7;
const ROWS = 4;

const grid = generateGrid(COLUMNS, ROWS);
generateObstacles(grid);

const aStar = new AStar(grid);

aStar.printGrid();

aStar.search([3, 1], [6, 2]);
