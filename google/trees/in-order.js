console.log('\n\t - In Order Traversal:\n');

function inOrderTraversal(node) {
  if (node) {
    inOrderTraversal(node.children[0]);
    visit(node);
    inOrderTraversal(node.children[1]);
  }
}

inOrderTraversal(root);
