const flattenArrayIter = array => {
  let result = [];
  let queue = [];

  for (let i = 0; i < array.length; i++) {
    queue = [array[i]];

    while (queue.length > 0) {
      const item = queue.shift();

      if (Array.isArray(item)) {
        queue = [...item, ...queue];
      } else {
        result.push(item);
      }
    }
  }

  return result;
};

const flattenArrayIter2 = array => {
  // make a copy of the original
  let nodes = array.slice();
  let result = [];

  while (nodes.length > 0) {
    let node = nodes.shift();

    if (Array.isArray(node)) {
      nodes = [...node, ...nodes];
    } else {
      result.push(node);
    }
  }

  return result;
};

const flattenRecur = array => {
  const flat = [].concat(...array);
  return array.some(Array.isArray) ? flattenRecur(flat) : flat;
};

const TEST1 = [
  1,
  [[2, 3]],
  [4, 5],
  [6, 7],
  [{}, [[[8, 9], [[10, 11]]]], [12, 13]]
];

let result1 = flattenArrayIter2(TEST1);
let result2 = flattenRecur(TEST1);
