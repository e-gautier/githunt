import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../assets/scss/App.css';
import Header from './header';
import ErrorBoundary from './errorBoundary';
import GithubService from '../services/githubService';
import moment from 'moment';
import Helmet from 'react-helmet';
import app from '../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroller';
import Date from './date';
import { Row } from 'react-bootstrap';
import Repo from './repo';
import Fade from 'react-reveal';
import ScrollToTop from 'react-scroll-up';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * Repos[] associative array of repos and since dates
       *
       * Read cache if it exists and cache was updated before 24H ago
       */
      repos:
        localStorage.getItem('githunt.repos') &&
        moment(localStorage.getItem('githunt.cache.date')).diff(moment(), 'hours') > -23
          ? JSON.parse(localStorage.getItem('githunt.repos'))
          : [],
      period: localStorage.getItem('githunt.period') ? localStorage.getItem('githunt.period') : 'daily',
      language: localStorage.getItem('githunt.language') ? localStorage.getItem('githunt.language') : '',
      to: localStorage.getItem('githunt.to') ? moment(localStorage.getItem('githunt.to')) : moment(),
      darkMode:
        localStorage.getItem('githunt.mode.dark') === 'true'
          ? localStorage.getItem('githunt.mode.dark') === 'true'
          : false,
      repoAmount: localStorage.getItem('githunt.repoAmount') ? localStorage.getItem('githunt.repoAmount') : 30,
      accessToken: localStorage.getItem('githunt.accessToken') ? localStorage.getItem('githunt.accessToken') : '',
      fetching: false
    };
  }

  cacheRepos() {
    localStorage.setItem('githunt.repos', JSON.stringify(this.state.repos));
    localStorage.setItem('githunt.to', this.state.to.format());
    localStorage.setItem('githunt.cache.date', moment().format());
    localStorage.setItem('githunt.repoAmount', this.state.repoAmount);
    localStorage.setItem('githunt.accessToken', this.state.accessToken);
  }

  fetchRepos = (to = moment()) => {
    this.setState({
      fetching: true,
      error: undefined
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
    githubService
      .fetchRepos('stars', this.state.language, this.state.repoAmount, since, to, this.state.accessToken)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          response.json().then(body => {
            this.setState({
              error: body.message
            });
          });
        }
      })
      .then(body => {
        if (body === undefined) {
          return;
        }
        const currentRepos = this.state.repos;
        currentRepos.push({
          elements: body.items,
          since: since.clone(),
          to: to.clone()
        });
        this.setState(
          {
            repos: currentRepos,
            to: since.clone(),
            fetching: false
          },
          () => this.cacheRepos()
        );
      });
  };

  handleRepoAmountChange = amount => {
    this.setState(
      {
        repoAmount: amount
      },
      () => {
        this.cacheRepos();
        this.refreshRepos();
      }
    );
  };

  handleAccessTokenChange = token => {
    this.setState(
      {
        accessToken: token
      },
      () => {
        this.cacheRepos();
      }
    );
  };

  refreshRepos = () => {
    this.setState({
      repos: []
    });
    this.fetchRepos();
  };

  handlePeriodChange = period => {
    localStorage.setItem('githunt.period', period);
    this.setState(
      {
        period,
        repos: []
      },
      () => this.fetchRepos()
    );
  };

  handleLanguageInput = language => {
    localStorage.setItem('githunt.language', language);
    this.setState(
      {
        language,
        repos: []
      },
      () => this.fetchRepos()
    );
  };

  switchMode = checked => {
    this.setState(
      {
        darkMode: checked
      },
      () => {
        checked
          ? localStorage.setItem('githunt.mode.dark', 'true')
          : localStorage.setItem('githunt.mode.dark', 'false');
      }
    );
  };

  render() {
    let rows = [];
    this.state.repos.map((repos, index) => {
      return rows.push(
        <Fade duration={300} key={index}>
          <Date since={repos.since} to={repos.to} />
          <Row>
            {repos.elements.map(repo => (
              <Repo
                key={repo.id}
                fullName={repo.full_name}
                description={repo.description}
                forks={repo.forks_count}
                stars={repo.stargazers_count}
                openIssues={repo.open_issues}
                htmlURL={repo.html_url}
                createdAt={repo.created_at}
                watchers={repo.watchers_count}
                license={repo.license ? repo.license.key : null}
                darkMode={this.state.darkMode}
              />
            ))}
          </Row>
        </Fade>
      );
    });

    const loader = (
      <div className="loader-small" key={0}>
        <FontAwesomeIcon icon={faSyncAlt} spin />
        &nbsp;
        <strong>Wait, hunting them down...</strong>
        <br />
        <span>{this.state.error}</span>
        <span>
          {this.state.error && (
            <button onClick={() => this.setState({ fetching: false, error: undefined })}>try again</button>
          )}
        </span>
      </div>
    );

    return (
      <div className={this.state.darkMode ? 'dark' : 'light'} id="theme-container">
        <div className="App container">
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="manifest.json" />
            <link rel="shortcut icon" href="favicon.ico" />
            <title>{app.name}</title>
          </Helmet>
          <ErrorBoundary errorMessage={this.state.error}>
            <ScrollToTop showUnder={160}>
              <FontAwesomeIcon icon={faArrowAltCircleUp} size={'3x'} />
            </ScrollToTop>
            <Header
              language={this.state.language}
              period={this.state.period}
              handlePeriodChange={this.handlePeriodChange}
              handleLanguageInput={this.handleLanguageInput}
              refreshRepos={this.refreshRepos}
              repos={this.state.repos}
              switchMode={this.switchMode}
              darkMode={this.state.darkMode}
              repoAmount={this.state.repoAmount}
              handleRepoAmountChange={this.handleRepoAmountChange}
              accessToken={this.state.accessToken}
              handleAccessTokenChange={this.handleAccessTokenChange}
            />
            <Fade duration={300}>
              <InfiniteScroll
                pageStart={0}
                loadMore={() => this.state.fetching || this.fetchRepos(this.state.to)}
                hasMore={true || false}
                loader={loader}
              >
                {rows}
              </InfiniteScroll>
            </Fade>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
