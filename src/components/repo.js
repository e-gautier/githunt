import React, { Component } from 'react';
import '../assets/scss/repo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch, faStar, faExclamationCircle, faGavel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { THEME } from '../actions/settings';
import classNames from 'classnames';

class Repo extends Component {
  render() {
    const theme = this.props.settings.theme.toLowerCase();
    const badgeClass = classNames('badge', {
      'text-dark': theme == THEME.LIGHT.toLowerCase(),
    });
    const license = this.props.license ? (
      <div className={badgeClass} title="license">
        <FontAwesomeIcon icon={faGavel} />
        &nbsp;
        <span className="metadataText">{this.props.license}</span>
      </div>
    ) : null;

    return (
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <a href={this.props.htmlURL}>{this.props.fullName}</a>
            </h5>
            <p className="card-text">
              {this.props.description ? this.props.description : <i>No description provided</i>}
            </p>
          </div>
          <div className="card-footer text-muted">
            <div className="d-flex justify-content-center">
              <div className={badgeClass} title="forks">
                <FontAwesomeIcon icon={faCodeBranch} />
                &nbsp;
                <span className="metadataText">{this.props.forks}</span>
              </div>
              <div className={badgeClass} title="stars">
                <FontAwesomeIcon icon={faStar} />
                &nbsp;
                <span className="metadataText">{this.props.stars}</span>
              </div>
              <div className={badgeClass} title="issues">
                <FontAwesomeIcon icon={faExclamationCircle} />
                &nbsp;
                <span className="metadataText">{this.props.openIssues}</span>
              </div>
              {license}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Repo = connect((state) => {
  return state;
})(Repo);

export default Repo;
