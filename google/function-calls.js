// How do you make a function that only calls input function f every 50 milliseconds?

const callingFunction = (func, mls = 1000) => {
  let counter = 0;

  setInterval(() => {
    func();
    console.log(`Count: ${counter}. Seconds: ${mls / 1000}`);
    counter += 1;
    mls += 1000;
  }, mls);
};

// callingFunction(() => console.log('Hi'));

const f = args => console.log('hi', args);

const funcOnTimeout = (func, mls = 3000) => () => {
  return setTimeout(() => {
    func.bind(null, Array.apply(arguments))();
  }, 3000);
};

funcOnTimeout(f)();
