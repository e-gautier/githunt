import React, { Component } from 'react';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons/index';
import Date from '../components/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BottomScrollListener from 'react-bottom-scroll-listener';
import Repo from '../components/repo';
import '../assets/scss/repoList.css';
import { Row } from 'react-bootstrap';

export default class RepoList extends Component {
  componentDidMount() {
    return this.props.repos.length === 0 ? this.props.fetchRepos() : null;
  }

  refreshRepos = () => {
    this.setState({
      repos: []
    });
    this.props.fetchRepos();
  };

  render() {
    let reposList = (
      <div className="row">
        <div className="offset-5 loader">
          <strong className="text-loader">Wait, hunting them down...</strong>
          <FontAwesomeIcon icon={faSyncAlt} spin size="5x" />
          <br/>
          <span>{this.props.error}</span>
        </div>
      </div>
    );

    let loader = null;
    if (this.props.fetching) {
      loader = (
        <div className="loader-small">
          <FontAwesomeIcon icon={faSyncAlt} spin />
          &nbsp;
          <strong>Wait, hunting them down...</strong>
          <br/>
          <span>{this.props.error}</span>
        </div>
      );
    } else {
      loader = (
        <BottomScrollListener onBottom={this.props.onBottomApp} offset={1200} />
      );
    }

    if (this.props.repos.length !== 0) {
      reposList = this.props.repos.map((repos, index) => (
        <div key={index}>
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
                darkMode={this.props.darkMode}
              />
            ))}
            {loader}
          </Row>
        </div>
      ));
    }

    return reposList;
  }
}
