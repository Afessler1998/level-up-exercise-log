export default function cancellableTimeout(timeoutCallback, duration) {
  const returnObject = {};

  const signal = new Promise((resolve, reject) => {
    returnObject.cancel = () => {
      reject(new Error("Cancelled"));
    };
  });

  returnObject.promise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      timeoutCallback();
      resolve("timed out");
    }, duration);

    signal.catch((error) => {
      clearTimeout(timeout);
    });
  });

  return returnObject;
}
