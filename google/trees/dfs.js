let root = getNode('a');

console.log('DFS');

function dfs(root) {
  if (!root) {
    return;
  }
  visit(root);
  root.visited = true;

  for (let i = 0; i < root.children.length; i++) {
    let child = root.children[i];
    if (!child.visited) {
      dfs(child);
    }
  }
}

dfs(root);
