import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/animate.css/animate.min.css';
import '../assets/scss/app.css';
import Header from './header';
import ErrorBoundary from './errorBoundary';
import moment from 'moment';
import Helmet from 'react-helmet';
import app from '../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroller';
import Date from './date';
import Repo from './repo';
import ScrollToTop from 'react-scroll-up';
import { connect } from "react-redux";
import { fetchRepos, setRepos, setToDate, tryAgain } from "../actions/repos";
import { PERIOD } from "../actions/settings";

class App extends Component {
  constructor(props) {
    super(props);

    if (moment(props.repos.cacheDate).diff(moment(), 'hours') < -12) {
      props.setRepos([]);
      props.setToDate(moment());
    }
  }

  fetchRepos = () => {
    const lastRepo = this.props.repos.repos[this.props.repos.repos.length-1];
    const to = lastRepo ? moment(lastRepo.since) : moment();

    const since = (period => {
      switch (period) {
        case PERIOD.DAILY:
          return to.clone().subtract(1, 'days');
        case PERIOD.WEEKLY:
          return to.clone().subtract(1, 'weeks');
        case PERIOD.MONTHLY:
          return to.clone().subtract(1, 'months');
        case PERIOD.YEARLY:
          return to.clone().subtract(1, 'years');
        default:
          return moment();
      }
    })(this.props.settings.period);

    this.props.fetchRepos(
      'stars',
      this.props.settings.language,
      this.props.settings.repoAmount,
      since,
      to,
      this.props.settings.accessToken
    );
  };

  render() {
    const rows = this.props.repos.repos.map((repos, index) => (
      <div className="animated fadeIn" key={index}>
        <div className="text-center w-100"><Date since={repos.since} to={repos.to}/></div>
        <div className="row">
          {repos.items.map(repo => (
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
            />
          ))}
        </div>
      </div>
    ));

    const loader = (
      <div className="loader-small" key={0}>
        <FontAwesomeIcon icon={faSyncAlt} spin />
        &nbsp;
        <strong>Wait, hunting them down...</strong>
        <br />
        <span>{this.props.repos.error}</span>
        <span>
          {this.props.repos.error && (
            <button onClick={() => this.props.tryAgain()}>try again</button>
          )}
        </span>
      </div>
    );

    const scrollToTopStyles = {
      position: 'fixed',
      bottom: 50,
      right: 30,
      cursor: 'pointer',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'linear',
      transitionDelay: '0s',
      zIndex: 1
    };

    return (
      <div className={this.props.settings.theme.toLowerCase()} id="theme-container">
        <div className="App container">
          <Helmet>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="theme-color" content="#000000" />
            <link rel="manifest" href="manifest.json" />
            <link rel="shortcut icon" href="favicon.ico" />
            <title>{app.name}</title>
          </Helmet>
          <ErrorBoundary errorMessage={this.props.repos.error}>
            <ScrollToTop showUnder={160} style={scrollToTopStyles}>
              <FontAwesomeIcon icon={faArrowAltCircleUp} size={'3x'} />
            </ScrollToTop>
            <Header/>
            <div className="animated fadeIn">
              <InfiniteScroll
                pageStart={0}
                loadMore={() => this.props.repos.error || this.props.repos.fetching || this.fetchRepos()}
                hasMore={true}
                loader={loader}
              >
                {rows}
              </InfiniteScroll>
            </div>
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

App = connect(state => {return state}, {
  tryAgain,
  fetchRepos,
  setRepos,
  setToDate
})(App);

export default App;
