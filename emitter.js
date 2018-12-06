class Emitter {
  constructor() {
    this.queue = {};
  }

  subscribe(event, fn) {
    this.queue[event] = this.queue[event] ? [...this.queue[event], fn] : [fn];

    return {
      release: () => {
        let fnIndex = this.queue[event].indexOf(fn);

        for (let i = 0; i < this.queue[event].length; i++) {
          if (fnIndex === i) {
            this.queue[event].splice(i, 1);
            break;
          }
        }
      }
    };
  }

  emit(event, ...paramArgs) {
    this.queue[event].forEach(fn => {
      fn.call(null, ...paramArgs);
    });
  }
}

let emitter = new Emitter();

let sub1 = emitter.subscribe('gaw', (name, lastname) =>
  console.log(`I am a dog. Hi ${name} ${lastname}`)
);
let sub2 = emitter.subscribe('gaw', (name, lastname) =>
  console.log(`I am a foo. Hi ${name} ${lastname}`)
);

let sub3 = emitter.subscribe('gaw', (name, lastname) =>
  console.log(`I am a troo. Hi ${name} ${lastname}`)
);

emitter.emit('gaw', 'daler', 'asrorov');

console.log(emitter);
sub2.release();
console.log(emitter);

emitter.emit('gaw', 'durak', 'burak');
