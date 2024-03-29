// import { parentPort } from 'worker_threads';

function fib(n: number) {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

module.exports = (n: number) => {
  return fib(n);
};

// parentPort.on('message', ({ n, id }) => {
//   const result = fib(n);
//   parentPort.postMessage({ result, id });
// });
