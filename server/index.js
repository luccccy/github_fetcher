const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const mongoose = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  github.getReposByUsername(req.body.username)
  .then(data => {
    return JSON.parse(data);
  })
  .then(data => {
    //console.log(data);
    return mongoose.save(data);
  })
  .then(() => {
    mongoose.Repo.find({}).lean().sort({repo_created_at: -1}).exec(function(err, docs) {
      res.send(docs.slice(0, 25));
    });
  })
  .catch(err => {
    throw new Error('cannot post');
  })



});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  //console.log(req);
  // mongoose.Repo.find()
  // .then(data => {
  //   console.log(data.toArray);
  // })
  mongoose.Repo.find({}).lean().sort({repo_created_at: -1}).exec(function(err, docs) {
    console.log(docs);
    res.send(docs.slice(0, 25));
});

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

