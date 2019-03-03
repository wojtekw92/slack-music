const ogs = require('open-graph-scraper');
function ogsPromise(urlLink) {
  return new Promise((resolve, reject) => {
    ogs({
      url: urlLink
    }, function (error, results) {
          resolve(results.data);
    });
  });
}

module.exports = {
    ogsPromise,
    
}