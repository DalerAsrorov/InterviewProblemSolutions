const flattenArray = array => {
  let result = [];
  let queue = [];

  for (let i = 0; i < array.length; i++) {
    const elem = array[i];
    queue = [elem];

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

let result = flattenArray([
  1,
  [2, 3],
  [4, 5],
  [6, 7],
  [{}, [[[8, 9], [[10, 11]]]], [12, 13]]
]);

console.log({ result });
