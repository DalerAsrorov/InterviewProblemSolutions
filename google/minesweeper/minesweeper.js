const N_ROWS = 4;
const N_COLS = 4;
let isGameOver = false;
let gameStatus = document.createElement('p');
let gameContainer = document.getElementById('mineSweeperGame');
let gridContainer = document.createElement('div');
let grid = [];

// prepare grid container
gridContainer.setAttribute('style', 'display: flex; flex-direction: column;');
gameContainer.append(gridContainer);
// game status
gameContainer.append(gameStatus);

function Tile({ x, y, node, isOpen = false, hasBomb = false } = {}) {
    this.x = x;
    this.y = y;
    this.value = 0;
    this.node = node;
    this.isOpen = isOpen;
    this.hasBomb = hasBomb;
    this.neighbors = [];
}
Tile.prototype.getElement = function () {
    return this.node;
}
Tile.prototype.setNeighbors = function (neighbors = []) {
    this.neighbors = neighbors;
}
Tile.prototype.getPosition = function () {
    return {
        x: this.x,
        y: this.y
    }
}

function getTileAt({ grid, x, y }) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].x === x && grid[i].y === y) {
            return grid[i];
        }
    }
    return null;
}

function getRandomBombCoords(nColumns, numberOfBombs = 3) {
    let bombCoords = [];

    for (let i = 0; i < numberOfBombs; i++) {
        let x = Math.floor(Math.random() * nColumns);
        let y = Math.floor(Math.random() * nColumns);

        bombCoords.push([x, y]);
    }

    return bombCoords;
}

// Given tile, returns all its neighbors
// Input: Array<Tile> grid, Tile tile
// Output: Array<Tile> neighbors
function getNeighbors(grid, tile) {
    let neighbors = [];
    let tileCoords = tile.getPosition();
    let currX = tileCoords.x;
    let currY = tileCoords.y;

    let upLeftNeighbor = [currX - 1, currY - 1];
    let upNeighbor = [currX, currY - 1];
    let upRightNeighbor = [currX + 1, currY - 1];
    let leftNeighbor = [currX - 1, currY];
    let rightNeighbor = [currX + 1, currY];
    let downLeftNeighbor = [currX - 1, currY + 1];
    let down = [currX, currY + 1];
    let downRightNeighbor = [currX + 1, currY + 1];

    let neighborsCoordsList = [
        upLeftNeighbor,
        upNeighbor,
        upRightNeighbor,
        leftNeighbor,
        rightNeighbor,
        downLeftNeighbor,
        down,
        downRightNeighbor
    ];

    neighbors = neighborsCoordsList.reduce(function (accum, neighborCoord) {
        const [x, y] = neighborCoord;
        let potentialTileNeighbor = getTileAt({ grid, x, y });

        if (potentialTileNeighbor) {
            accum.push(potentialTileNeighbor);
        }

        return accum;
    }, []);

    return neighbors;
}

function checkIfWon(grid) {
    const tilesTotal = grid.length;
    const tilesOpen = grid.filter(tile => tile.isOpen).length;
    const bombsCount = grid.filter(tile => tile.hasBomb).length;

    return tilesOpen + bombsCount === tilesTotal;
}
function updateGameStatus(text) {
    gameStatus.innerHTML = text;
}
function applyRowStyle(rowDomElement) {
    rowDomElement.setAttribute('style', 'display: flex; flex-direction: row;')
}
function renderTiles(grid) {
    let row = document.createElement('div');
    let tile, tileEl;

    applyRowStyle(row);

    for (let i = 1; i <= grid.length; i++) {
        tile = grid[i - 1];
        tileEl = tile.getElement();

        if (tile.isOpen) {
            if (tile.hasBomb) {
                tileEl.innerHTML = 'BOMB!';
            } else {
                tileEl.innerHTML = tile.value;
                tileEl.style.background = 'yellow';
            }
        }

        row.append(tileEl);

        if (i % N_COLS === 0) {
            gridContainer.append(row);
            row = document.createElement('div');
            applyRowStyle(row);
        }
    }
}
function initializeTiles({ rows, columns, gridData }) {
    let randomBombCoords = getRandomBombCoords(N_COLS);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let el = document.createElement('div');

            el.setAttribute('style', 'flex: 1; background: lightgrey; border: 1px solid grey; height: 100px; display: flex; justify-content: center; align-items: center;');
            gridData.push(new Tile({
                x: j,
                y: i,
                node: el,
            }));
        }
    }

    // find all neghbors
    for (let i = 0; i < grid.length; i++) {
        let tile = grid[i];

        tile.setNeighbors(getNeighbors(grid, tile));
    }

    // initialize tiles with bombs
    randomBombCoords.forEach(bombCoord => {
        let bombTile = getTileAt({ grid, x: bombCoord[0], y: bombCoord[1] });
        bombTile.hasBomb = true;
    });

    // initialize tile values
    grid.forEach((tile) => {
        tile.value = tile.neighbors.reduce((accum, neighborTile) => {
            return neighborTile.hasBomb ? accum + 1 : accum;
        }, tile.value);
    });

    // initialize event listeners
    for (let i = 0; i < gridData.length; i++) {
        let tile = gridData[i];
        let tileEl = tile.getElement();

        tileEl.addEventListener('click', function () {
            if (!isGameOver) {
                tile.isOpen = true;

                if (tile.hasBomb) {
                    updateGameStatus('Game over');
                    isGameOver = true;
                } else {
                    let stack = [tile];
                    let neighbors;

                    while (stack.length !== 0) {
                        let root = stack.pop();
                        root.isOpen = true;

                        if (root.value === 0) {
                            neighbors = root.neighbors;

                            for (let i = 0; i < neighbors.length; i++) {
                                let neighbor = neighbors[i];

                                if (neighbor.value === 0 && !neighbor.isOpen) {
                                    stack.push(neighbor);
                                }
                                if (!neighbor.hasBomb) {
                                    neighbor.isOpen = true;
                                }
                            }
                        }
                    }
                }

                if (checkIfWon(grid)) {
                    updateGameStatus('You won!');
                    isGameOver = true;
                }

                renderTiles(grid);
            }
        });
    }
}

initializeTiles({
    rows: N_ROWS,
    columns: N_COLS,
    gridData: grid
});
renderTiles(grid);