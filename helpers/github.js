const request = require('request');
const config = require('../config.js');
var rq = require('request-promise');

let getReposByUsername = (userName) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // request(options, function(err, res, body) {
  //   var json = JSON.parse(body)
  //   console.log(json);
  // })
  //return a promise of fetch data from url;
  return rq(options);


}

module.exports.getReposByUsername = getReposByUsername;