console.log('\n\t - Pre Order Traversal:\n');

function preOrderTraversal(node) {
  if (node) {
    visit(node);
    preOrderTraversal(node.children[0]);
    preOrderTraversal(node.children[1]);
  }
}

preOrderTraversal(root);
