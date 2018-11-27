module.exports = class Node {
  constructor({
    f = 0,
    g = 0,
    h = 0,
    value,
    position = [0, 0],
    parent = null
  } = {}) {
    this.f = f;
    this.g = g;
    this.h = h;
    this.position = position;
    this.value = value;
    this.parent = parent;
  }
};
