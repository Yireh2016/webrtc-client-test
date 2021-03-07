const logguer = (...args) => {
  const enableLogs = true;
  enableLogs && console.log(...args);
};

export default logguer;
