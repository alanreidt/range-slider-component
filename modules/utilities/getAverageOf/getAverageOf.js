const getAverageOf = function getAverageOfFromUtilities(arr) {
  return arr.reduce((sum, current) => sum + current, 0) / arr.length;
};

export default getAverageOf;
