import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/header';
import ErrorBoundary from './components/errorBoundary';
import RepoList from "./components/repoList";
import GithubService from "./services/gitthubService";
import moment from "moment/moment";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * Repos[] associative array of repos and since dates
       *
       * Read cache if it exists and cache was updated before 24H ago
       */
      repos: (
        localStorage.getItem('githunt.repos') && (moment(localStorage.getItem('githunt.cache.date')).diff(moment(), 'hours')) > -23
      ) ? JSON.parse(localStorage.getItem('githunt.repos')) : [],
      fetching: false,
      period: localStorage.getItem('githunt.period') ? localStorage.getItem('githunt.period') : 'daily',
      language: localStorage.getItem('githunt.language') ? localStorage.getItem('githunt.language') : '',
    };
  }

  cacheRepos() {
    localStorage.setItem('githunt.repos', JSON.stringify(this.state.repos));
    localStorage.setItem('githunt.cache.date', moment().format('YYYYMMDD'));
  }

  fetchRepos = (startTo = moment(), endTo = null) => {

    this.setState({
      fetching: true
    });

    let since = moment();
    let to = endTo ? endTo : moment();

    switch (this.state.period) {
      case 'daily':
        since = startTo.subtract(1, 'days');
        break;
      case 'weekly':
        since = startTo.subtract(1, 'weeks');
        break;
      case 'monthly':
        since = startTo.subtract(1, 'months');
        break;
      case 'yearly':
        since = startTo.subtract(1, 'years');
        break;
      default:
        break;
    }

    const githubService = new GithubService();
    githubService.fetchRepos('stars', this.state.language, since, to)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then((body) => {
            this.setState({
              error: body.message,
              fetching: false
            });
          });
        }
      })
      .then(
        (body) => {
          const currentRepos = this.state.repos;
          currentRepos.push({
            elements: body.items,
            since: since.clone(),
            to: to.clone()
          });
          this.setState({
            repos: currentRepos,
            oldestDate: since.clone(),
            recentDate: startTo.clone(),
            fetching: false
          }, () => this.cacheRepos());
        }
      );
  };

  refreshRepos = () => {
    this.setState({
      repos: []
    });
    this.fetchRepos();
  };

  onBottomApp = () => {
    if (!this.state.fetching) {
      this.fetchRepos(this.state.oldestDate, this.state.recentDate);
    }
  };

  handlePeriodChange = (period) => {
    localStorage.setItem('githunt.period', period);
    this.setState({
      period,
      repos: []
    }, () => this.fetchRepos());
  };

  handleLanguageInput = (language) => {
    localStorage.setItem('githunt.language', language);
    this.setState({
      language,
      repos: []
    }, () => this.fetchRepos());
  };

  render() {
    return (
      <div className="App container">
        <ErrorBoundary errorMessage={this.state.error}>
          <Header
            language={this.state.language}
            period={this.state.period}
            handlePeriodChange={this.handlePeriodChange}
            handleLanguageInput={this.handleLanguageInput}
            refreshRepos={this.refreshRepos}
            repos={this.state.repos}
          />
          <RepoList
            error={this.state.error}
            fetchRepos={this.fetchRepos}
            onBottomApp={this.onBottomApp}
            repos={this.state.repos}
            fetching={this.state.fetching}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
