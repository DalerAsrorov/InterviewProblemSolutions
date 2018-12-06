// 1. Describe what this function is doing...
// Answer: this function accepts a list of items as the first argument
// and list of items that need to be excluded based on key-value pair.
// After matching the pairs with items, it returns the changed array with
// excluded items filtered out.
// 2. What is wrong with that function?
// It is mutating the original array
// Did not match key pair
// filter condition was wrong
// It needs
// 3. How would you optimize it ?

items = [
  { color: 'red', type: 'tv', age: 18 },
  { color: 'silver', type: 'phone', age: 20 },
  { color: 'gold', type: 'tablet', age: 18 },
  { color: 'yellow', type: 'iphone', age: 12 }
];

excludes = [{ k: 'color', v: 'silver' }, { k: 'type', v: 'tv' }];

function excludeItems(items, excludes) {
  excludes.forEach(pair => {
    items = items.filter(item => item[pair.k] !== pair.v);
  });
  return items;
}

function excludeItems2(items, excludes) {
  const newItems = [...items].reduce((accum, curr) => {
    let shouldBeAdded = true;
    excludes.forEach(pair => {
      if (curr[pair.k] === pair.v) {
        shouldBeAdded = false;
      }
    });

    if (shouldBeAdded) {
      accum.push(curr);
    }

    return accum;
  }, []);

  return newItems;
}

// console.log(excludeItems(items, excludes));
console.log(excludeItems2(items, excludes));
