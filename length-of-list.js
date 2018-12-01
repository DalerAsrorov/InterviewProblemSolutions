// Given an unsorted array of integers, find the length of longest increasing subsequence.
// Input: [10,9,2,5,3,7,101,18]
// Output: 4
// Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

const lengthOfLIS = (nums = []) => {
  let size = 0;
  let tails = [];

  for (let num of nums) {
    let i = 0,
      j = size;

    while (i != j) {
      let mid = parseInt((i + j) / 2);

      if (tails[mid] < num) {
        i = mid + 1;
      } else {
        j = mid;
      }
    }
    tails[i] = num;
    if (i === size) {
      size += 1;
    }
  }

  return size;
};

const TEST1 = [10, 9, 2, 5, 3, 7, 101, 18];
const TEST2 = [2, 2];
const TEST3 = [3, 2, 1];

console.log(lengthOfLIS(TEST1));
console.log(lengthOfLIS(TEST2));
console.log(lengthOfLIS(TEST3));
