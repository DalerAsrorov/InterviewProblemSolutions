const swap = (array, aIndex, bIndex) => {
  const temp = array[aIndex];
  array[aIndex] = array[bIndex];
  array[bIndex] = temp;
};

const generateRandomNext = (max, min) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const shuffleArray = array => {
  const n = array.length - 1;

  for (let i = 0; i <= n; i++) {
    const curr = array[i];
    const randomIndex = generateRandomNext(n, i);

    swap(array, i, randomIndex);
  }

  return array;
};

const TEST1 = [2, 5, 1, 6, 8];
console.log('before', TEST1);
console.log('after', shuffleArray(TEST1));

