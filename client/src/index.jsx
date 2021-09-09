import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      repos: []
    }
  }

  search (term) {
    // TODO
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({username: term})
    };
    fetch('http://localhost:1128/repos', requestOptions)
    .then(response => {
      return response.json();
    }).then(data => {

      this.setState({
        isLoaded: true,
        repos: data
      });

    },

    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
    )
    .then(() => {
      window.location.reload();
    })
    // .catch(err => {
    //   console.log('Error reading data' + err);
    // });
  }

  componentDidMount() {
    fetch("http://localhost:1128/repos")
      .then(res => res.json())
      .then(
        (result) => {

          this.setState({
            isLoaded: true,
            repos: result
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render () {
    const { error, isLoaded, repos } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Github Fetcher</h1>
          <RepoList repos={this.state.repos} isLoaded={this.state.isLoaded}/>
          <Search onSearch={this.search.bind(this)}/>
        </div>
      )
    }
  }

}

ReactDOM.render(<App />, document.getElementById('app'));