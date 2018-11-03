const assertEqual = (testName = '', actual, expected) =>
  `${testName}: ${actual === expected}`;

module.exports = assertEqual;
