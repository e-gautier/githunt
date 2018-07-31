import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/header';
import ErrorBoundary from './components/errorBoundary';
import RepoList from "./components/repoList";
import GithubService from "./services/gitthubService";
import moment from "moment/moment";
import Helmet from 'react-helmet';
import app from "../package.json";

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
      to: localStorage.getItem('githunt.to') ? moment(localStorage.getItem('githunt.to')) : moment(),
    };
  }

  cacheRepos() {
    localStorage.setItem('githunt.repos', JSON.stringify(this.state.repos));
    localStorage.setItem('githunt.to', this.state.to.format());
    localStorage.setItem('githunt.cache.date', moment().format());
  }

  fetchRepos = (to = moment()) => {

    this.setState({
      fetching: true
    });

    let since = moment();

    switch (this.state.period) {
      case 'daily':
        since = to.clone().subtract(1, 'days');
        break;
      case 'weekly':
        since = to.clone().subtract(1, 'weeks');
        break;
      case 'monthly':
        since = to.clone().subtract(1, 'months');
        break;
      case 'yearly':
        since = to.clone().subtract(1, 'years');
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
            to: since.clone(),
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
      this.fetchRepos(this.state.to);
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
        <Helmet>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="manifest.json" />
          <link rel="shortcut icon" href="favicon.ico" />
          <title>{app.name}</title>
        </Helmet>
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
