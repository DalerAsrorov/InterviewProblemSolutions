class Node {
  constructor({ action, timestamp, children = {}, counter = 1 } = {}) {
    this.action = action;
    this.timestamp = timestamp;
    this.children = children;
    this.counter = counter;
  }
}

const buildGraph = (nodeList, tree = null) => {
  let root = null;

  // if no tree with given root exists then build a new tree
  if (!tree) {
    if (nodeList.length > 1) {
      for (let i = 0; i < nodeList.length - 1; i++) {
        let node = nodeList[i];
        let child = nodeList[i + 1];
        let { action } = child;

        node.children[child.action] = child;
      }
    }

    root = nodeList[0];
  }
  // Otherwise, if tree already exists, traverse through the
  // new list and merge new nodes from that list with existing tree
  // nodes and update the counter
  else {
    root = tree;

    if (root.action === nodeList[0].action) {
      root.counter += 1;
    }

    let curr = root;

    for (let i = 1; i < nodeList.length; i++) {
      let listNode = nodeList[i];
      let child = curr.children[listNode.action];

      if (child) {
        let existingChildNode = curr.children[child.action];
        existingChildNode.counter += 1;

        curr = existingChildNode;
      } else {
        curr.children[listNode.action] = listNode;
        curr = listNode;
      }
    }
  }

  return root;
};

const outputFlowGraph = flowGraph => {
  let childrenKeys = Object.keys(flowGraph);

  for (let i = 0; i < childrenKeys.length; i++) {
    let childKey = childrenKeys[i];
    let node = flowGraph[childKey];

    printLevelOrder(node);
  }
};

const attachCarrot = (str, carrotNum, char = '|---') =>
  [...Array(carrotNum).keys()].reduce(accum => char + accum, str);

const printLevelOrder = root => {
  if (!root) {
    return;
  }

  let queue = [root];
  let carrotCount = 1;

  while (queue.length > 0) {
    let nodeCount = queue.length;

    let str = '';
    while (nodeCount > 0) {
      let node = queue[0]; // peek
      let childStr = attachCarrot(
        `${node.action} (${node.counter})`,
        carrotCount
      );
      str += childStr;
      queue.shift();

      // iterate over all children
      let childrenKeys = Object.keys(node.children);

      if (childrenKeys.length > 0) {
        childrenKeys.forEach(childKey => {
          let child = node.children[childKey];

          if (child && Object.keys(child).length > 0) {
            queue.push(child);
          }
        });
      }
      nodeCount--;
      str += '\n';
    }

    console.log(str);
    carrotCount += 1;
  }
};

/**
 * Algorithm to build flow graph
 * @param {Arra[]} dataList
 */
const buildFlowGraph = dataList => {
  let userMap = {};

  for (let i = 0; i < dataList.length; i++) {
    const dataPoint = dataList[i];
    const { user_id, timestamp, action } = dataPoint;

    if (userMap[user_id]) {
      userMap[user_id] = [...userMap[user_id], new Node({ action, timestamp })];
    } else {
      userMap[user_id] = [new Node({ action, timestamp })];
    }
  }

  let treeMap = {};
  for (let userId in userMap) {
    const nodes = userMap[userId];
    const root = nodes[0];
    const { action } = root;

    treeMap[action] = buildGraph(nodes, treeMap[action]);
  }

  return treeMap;
};

module.exports = { buildFlowGraph, outputFlowGraph, printLevelOrder };
