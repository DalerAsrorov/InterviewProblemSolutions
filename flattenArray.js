const flattenArray = array => {
  let stack = [array[0]];
  let result = [];

  while (stack.length > 0) {
    let nextArray = stack.pop();

    if (nextArray instanceof Array) {
      for (let i = 1; i < array.length; i++) {
        let element = array[i];

        if (element instanceof Array) {
          stack.push(element);
        } else {
          result.push(element);
        }
      }
    } else {
      result = [...result, nextArray];
    }
    console.log(stack);
    // return;
  }

  console.log(result);

  return result;
};

let result = flattenArray([2, [1, 2], [3, 4], [5, 6], [{}, [7, 8]]]);
