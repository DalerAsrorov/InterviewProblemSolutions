// Given [1, 2, 3, 4, 10, 11, 12, 13, 55, 76, 77]
// return ["1-4", "10-13", "55", "76-77"]

const TEST1 = [1, 2, 3, 4, 10, 11, 12, 13, 55, 76, 77]; // ["1-4", "10-13", "55", "76-77"]
const TEST2 = [1, 2, 3, 4, 5]; // ["1-5"]
const TEST3 = [1, 2, 3, 4, 33, 45, 55, 56, 57, 100]; // ["1-4", "33", "45", "55-57", "100"]

const formStringRanges = (listOfRangeTulpes, listOfNumbers) => {
  return listOfRangeTulpes.reduce((accum, rangeTulpe) => {
    let start = rangeTulpe[0];
    let end = rangeTulpe[1];
    let str = '';

    if (start === end) {
      str = `${listOfNumbers[start]}`;
    } else {
      str = `${listOfNumbers[start]}-${listOfNumbers[end]}`;
    }

    accum.push(str);

    return accum;
  }, []);
};

const generateRanges = listOfNumbers => {
  const len = listOfNumbers.length;
  let result = [];
  let listOfRangeTulpes = [];
  let lastEnd = len,
    lastStart = 0;

  while (lastStart < lastEnd) {
    for (let j = lastStart; j < lastEnd; j++) {
      let curr = listOfNumbers[j];
      let next = listOfNumbers[j + 1];

      if (next - curr !== 1) {
        lastEnd = j;
      }
    }

    listOfRangeTulpes.push([lastStart, lastEnd]);

    lastStart = lastEnd + 1;
    lastEnd = len - 1;
  }

  return formStringRanges(listOfRangeTulpes, listOfNumbers);
};

const result1 = generateRanges(TEST1);
const result2 = generateRanges(TEST2);
const result3 = generateRanges(TEST3);

console.log('result1', result1);
console.log('result2', result2);
console.log('result3', result3);
