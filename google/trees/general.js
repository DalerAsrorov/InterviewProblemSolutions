window.getNode = selector => document.querySelector('.' + selector);
window.visit = domNode => console.log(`Node: ${domNode.className}`);
window.isEmpty = list => list && list.length === 0;
window.root = getNode('a');
