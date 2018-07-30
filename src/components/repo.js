import React, {Component} from 'react';
import '../assets/css/repo.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCodeBranch, faStar, faExclamationCircle, faGavel} from "@fortawesome/free-solid-svg-icons";

export default class Repo extends Component {

  render() {
    const license = this.props.license ? (
      <div className="badge badge-light" title="license">
        <FontAwesomeIcon icon={faGavel}/>
        &nbsp;
        <span className="metadataText">{this.props.license}</span>
      </div>
    ) : (null);

    return (
      <div className="col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"><a href={this.props.htmlURL}>{this.props.fullName}</a></h5>
            <p className="card-text">
              {this.props.description ? this.props.description : <i>No description provided</i>}
            </p>
          </div>
          <div className="card-footer text-muted">
            <div className="row align-self-center">
              <div className="badge badge-light" title="forks">
                <FontAwesomeIcon icon={faCodeBranch}/>
                &nbsp;
                <span className="metadataText">{this.props.forks}</span>
              </div>
              <div className="badge badge-light" title="stars">
                <FontAwesomeIcon icon={faStar}/>
                &nbsp;
                <span className="metadataText">{this.props.stars}</span>
              </div>
              <div className="badge badge-light" title="issues">
                <FontAwesomeIcon icon={faExclamationCircle}/>
                &nbsp;
                <span className="metadataText">{this.props.openIssues}</span>
              </div>
              {license}
            </div>
          </div>
        </div>
      </div>
    )
  }
}