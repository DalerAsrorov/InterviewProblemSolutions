// - Trigger rate - number of times the event gets triggered within specified time frame.
// - Throttling is a straightforward reduction of the trigger rate.
// Multiple ways to throttle:
//  1. by number of events triggered
//  2. by number of events per unit time
//  3. by delay between two handled events

// 3. delay between two handled events
const throttledByDelay = (delay, fn) => {
  let lastCall = 0;

  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

// 1. Trigger handler every n times it was triggered
const throttledByNumberOfEvents = (n, fn) => {
  let total = 0;

  return (...args) => {
    total++;
    if (n - total > 0) {
      return;
    }
    total = 0;
    return fn(...args);
  };
};

// 2. Trigger by number of events per current time
const throttledByRate = (fn, nEvents, time) => {
  let countEvents = 0;

  return (...args) => {
    countEvents += 1;

    if (countEvents) return fn(...args);
  };
};
