var resemble = require('node-resemble-js-raw');

module.exports = function (referencePath, testPath, misMatchThreshold, resembleOutputSettings, requireSameDimensions) {
  return new Promise(function (resolve, reject) {
    resemble.outputSettings(resembleOutputSettings || {});
    resemble(referencePath).compareTo(testPath).onComplete(data => {
      if ((requireSameDimensions === false || data.isSameDimensions === true) && data.rawMisMatchPercentage <= misMatchThreshold) {
        return resolve(data);
      }
      reject(data)
    });
  });
};
