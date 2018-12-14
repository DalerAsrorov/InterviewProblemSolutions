// symetric tree
//    *
//   ***
//  *****
// *******
// odd: 2n - 1

const attachChars = (numOfChars, spaces = 0) => {
  let str = '';

  for (let j = 0; j < spaces; j++) {
    str += ' ';
  }
  for (let i = 0; i < numOfChars; i++) {
    str += '*';
  }

  if (spaces > 1) {
    str += '\n';
  }

  return str;
};

const printTree = levels => {
  let result = '';
  let spaces = levels;

  for (let i = 1; i <= levels; i++) {
    let numOfChars = 2 * i - 1;

    result += attachChars(numOfChars, spaces--);
  }

  console.log(result);
};

printTree(22);
