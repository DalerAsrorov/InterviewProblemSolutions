const { buildFlowGraph, outputFlowGraph } = require('./solution');
const data = require('./test-data');

const graphOne = buildFlowGraph(data.sample1);
const graphTwo = buildFlowGraph(data.sample2);

// console.log(graphOne);
outputFlowGraph(graphOne);
// outputFlowGraph(graphTwo);
