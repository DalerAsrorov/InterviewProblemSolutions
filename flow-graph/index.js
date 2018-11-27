const buildFlowGraph = require('./solution');
const data = require('./test-data');

const result1 = buildFlowGraph(data.sample1);
const result2 = buildFlowGraph(data.sample2);

console.log({ result1 }, '\n');
console.log({ result2 });
