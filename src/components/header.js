import React, { Component } from 'react';
import logo from '../assets/img/logo.png';
import '../assets/scss/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faInfoCircle, faCheck } from '@fortawesome/free-solid-svg-icons';
import ModalInfo from '../components/modalInfo';
import { Button } from 'react-bootstrap';
import app from '../../package.json';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openAbout: false,
      language: props.language
    };
  }

  openAbout = () => {
    this.setState({
      openAbout: true
    });
  };

  closeAbout = () => {
    this.setState({
      openAbout: false
    });
  };

  handleChange = event => {
    this.setState({ language: event.target.value });
  };

  render() {
    const refreshIcon = this.props.repos ? (
      <FontAwesomeIcon onClick={this.props.refreshRepos} icon={faSyncAlt} size="lg" className="icon" />
    ) : (
      <FontAwesomeIcon icon={faSyncAlt} size="lg" className="icon" spin />
    );

    return (
      <div>
        <ModalInfo
          openAbout={this.state.openAbout}
          closeAbout={this.closeAbout}
          switchMode={this.props.switchMode}
          darkMode={this.props.darkMode}
          repoAmount={this.props.repoAmount}
          handleRepoAmountChange={this.props.handleRepoAmountChange}
          accessToken={this.props.accessToken}
          handleAccessTokenChange={this.props.handleAccessTokenChange}
        />
        <div className="row">
          <div className="col-md-6">
            <div className="row title-container">
              <img src={logo} className="logo-main" alt="logo" />
              <h1>{app.name}</h1>
            </div>
            <span>Hunting the best GitHub projects</span>
          </div>
          <div className="col-md-6 options-container align-self-center">
            <div className="forms">
              <div className="mx-1">
                <select
                  value={this.props.period}
                  onChange={event => this.props.handlePeriodChange(event.target.value)}
                  className="form-control form-control-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="mx-1">
                <form onSubmit={event => event.preventDefault()} className="input-group">
                  <input
                    type="text"
                    placeholder="All languages"
                    className="form-control form-control-sm"
                    value={this.state.language}
                    onChange={this.handleChange}
                  />
                  <div className="input-group-append">
                    <Button
                      type="submit"
                      title="Valid"
                      onClick={() => this.props.handleLanguageInput(this.state.language)}
                      className="btn-sm"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                  </div>
                </form>
              </div>
              <div className="mx-1 buttons">
                {refreshIcon}
                <FontAwesomeIcon onClick={this.openAbout} icon={faInfoCircle} size="lg" className="icon ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
