const logguer = (...args) => {
  const enableLogs = false;
  enableLogs && console.log(...args);
};

export default logguer;
