class Stream {
  constructor(queue = []) {
    this.queue = queue;
  }

  subscribe(action) {
    if (typeof action === 'function') {
      this.queue.push(action);
    }
  }

  map(callback) {
    let queue = [];

    queue = this.queue.map(actionFn => arg => action(callback(arg)));
    this.queue = queue;

    return this;
  }

  push(value) {
    this.queue.forEach(actionFn => {
      actionFn.call(this, value);
    });
  }
}

// a -------1------2----3
// map -----\------\----\
// b --------2------4----6

const a = new Stream();
const b = a.map(value => value * 2);

b.subscribe(console.log);

a.push(1);
a.push(2);
a.push(3);

// expected output on console:
// 2
// 4
// 6
