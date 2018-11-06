console.log('BFS');

function bfs(root) {
  let queue = [];

  root.isMarked = true;
  queue.push(root);

  while (!isEmpty(queue)) {
    let node = queue.shift();
    visit(node);

    for (let i = 0; i < node.children.length; i++) {
      let child = node.children[i];

      if (!child.isMarked) {
        queue.push(child);
        child.isMarked = true;
      }
    }
  }
}

bfs(root);
