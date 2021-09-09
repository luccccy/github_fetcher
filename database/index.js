const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: {
    type: Number,
    unique: true
  },
  name: String,
  node_id: String,
  full_name: String,
  private: Boolean,
  html_url: String,
  repo_created_at: String
}, { timestamps: true });

let Repo = mongoose.model('Repo', repoSchema);

let save = (results) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  results.forEach(result => {
    var repoInfo = new Repo({
      _id: result.id,
      name: result.name,
      node_id: result.node_id,
      full_name: result.full_name,
      private: result.private,
      html_url: result.html_url,
      repo_created_at: result.created_at,
    })

    return repoInfo.save()
    .then(data => {
      console.log(data._doc);
    })
    .catch(err => {
      console.log(err);
    })
  });

  /** here is another method we can save info to mongodb ,
   * we dont need to new an instance, just save object to the create function!*/
  // Repo.create(result, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log('saved!');
  // })
  // console.log('returnResult', returnResult);
  // return returnResult;
};


module.exports.save = save;

module.exports.Repo = Repo;