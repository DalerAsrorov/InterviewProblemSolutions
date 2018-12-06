// O (n * n!)
const permutation = str => {
  if (str.length < 2) return str;

  let permutations = [];
  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (str.indexOf(char) != i) {
      continue;
    }

    let remainingStr = str.slice(0, i) + str.slice(i + 1, str.length);
    let tempResult = permutation(remainingStr);
    for (let subPermutation of tempResult) {
      const result = char + subPermutation;
      permutations.push(result);
    }
  }

  return permutations;
};

const test = permutation('ABC');

console.log({ test });

module.exports = permutation;
