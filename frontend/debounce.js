// Debouncing is keeping the event trigger rate at 0
// until calm. For example, search results will show up
// right after the user stops typing for specified time.
// Can be implemented using setTimeout/clearTimeout

const debounced = (delay, fn) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.call(this, ...args);
      timerId = null;
    }, delay);
  };
};
