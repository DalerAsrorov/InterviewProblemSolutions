module.exports = function(columns, rows, roadValue = 1) {
  let matrix = [];

  for (let i = 0; i < rows; i++) {
    let column = [];

    for (let j = 0; j < columns; j++) {
      column.push(roadValue);
    }

    matrix.push(column);
  }

  return matrix;
};
