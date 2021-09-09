import React from 'react';
import { Link } from 'react-router-dom';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>{props.repos.map((eachRepo, index) => {
      return (<div key={index} className="eachRepo">
        <p>{eachRepo.name}</p>
        <p>{eachRepo._id}</p>
        <div>{props.isLoaded && <a href={eachRepo.html_url}>{eachRepo.html_url}</a>}</div>
        <p>{eachRepo.repo_created_at}</p>
        </div>)
    })}
    </div>
  </div>
)

export default RepoList;
