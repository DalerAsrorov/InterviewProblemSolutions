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
  } else {
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

module.exports = buildFlowGraph;
