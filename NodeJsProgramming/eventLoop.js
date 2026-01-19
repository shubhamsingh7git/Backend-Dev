console.log("Start");

process.nextTick(() => {
  console.log("process.nextTick");
});

Promise.resolve().then(() => {
  console.log("Promise.then");
});

setTimeout(() => {
  console.log("setTimeout");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});

console.log("End");
