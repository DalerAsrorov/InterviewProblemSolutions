import AStar from './src/astar';
import generateGrid from './src/generate-grid';
import generateObstacles from './src/generate-obstacles';

const DATA_ATTR = 'data-coords';

const ROW_STYLE = () => 'flex: 1; display: flex; flex-flow: column;';
const COLUMN_STYLE = ({
  height = 100,
  background = '#ccc',
  borderColor = '#fff',
  isObstacle = false
} = {}) =>
  `flex: 1; height: ${height}px; border: 1px solid ${borderColor}; background: ${
    !isObstacle ? background : 'black'
  }`;

const form = document.getElementById('rowColumnForm');
const grid = document.getElementById('grid');
const pathButton = document.getElementById('pathHandler');

// initialiaze aStar instance
let aStar = new AStar();

const createGrid = (columns, rows, containerNode, obstacles) => {
  const grid = generateGrid(columns, rows);
  generateObstacles(grid, obstacles);
  aStar.init(grid);

  let gridStr = '';

  for (let y = 0; y < columns; y++) {
    let rowStr = `<div class="row" style="${ROW_STYLE()}">`;
    for (let x = 0; x < rows; x++) {
      const element = grid[x][y];
      const isObstacle = element === 0;

      rowStr += `<article ${DATA_ATTR}="${y},${x}" style="${COLUMN_STYLE({
        isObstacle
      })}" class="column"></article>`;
    }

    rowStr += `</div>`;
    gridStr += rowStr;
  }

  containerNode.innerHTML = gridStr;
};

// create a grid by default
createGrid(5, 5, grid, 10);

form.onsubmit = function(event) {
  event.preventDefault();

  const { value: rowValue } = document.getElementsByName('rows')[0];
  const { value: columnValue } = document.getElementsByName('columns')[0];

  const nRows = Number(rowValue);
  const nColumns = Number(columnValue);

  createGrid(nColumns, nRows, grid);
};

pathButton.onclick = event => {
  event.preventDefault();

  const { value: x1Input } = document.getElementsByName('x1')[0];
  const { value: y1Input } = document.getElementsByName('y1')[0];
  const { value: x2Input } = document.getElementsByName('x2')[0];
  const { value: y2Input } = document.getElementsByName('y2')[0];

  const x1 = Number(x1Input);
  const y1 = Number(y1Input);
  const x2 = Number(x2Input);
  const y2 = Number(y2Input);

  const path = aStar.search([x1, y1], [x2, y2]);

  tracePath({ path, x1, y1 });
};

const tracePath = ({ path, x1, y1 }) => {
  const N = path.length - 1;

  // debugger;
  (function loop(i) {
    setTimeout(() => {
      const {
        position: { x, y }
      } = path[i];

      let element = getNodeElement({ x, y });
      element.style.backgroundColor = 'lightblue';
      if (i < N) {
        i++;
        loop(i);
      }
    }, 1500);
  })(0);
};

const getNodeElement = ({ x, y, attr = DATA_ATTR } = {}) => {
  const nodes = document.getElementsByClassName('column');

  for (let i = 0; i < nodes.length; i++) {
    const coordAttribute = nodes[i].getAttribute(attr);
    const [xCoord, yCoord] = coordAttribute
      .split(',')
      .map(strNum => parseInt(strNum));

    if (x === xCoord && y === yCoord) {
      return nodes[i];
    }
  }

  return null;
};
