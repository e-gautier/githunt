import React, { Component } from 'react';
import logo from '../assets/img/logo.png';
import '../assets/scss/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSyncAlt,
  faInfoCircle,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import ModalInfo from '../components/modalInfo';
import { Row, Button } from 'react-bootstrap';
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
      <FontAwesomeIcon
        onClick={this.props.refreshRepos}
        icon={faSyncAlt}
        size="lg"
        className="icon"
      />
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
        <Row>
          <div className="col">
            <Row className="title-container">
              <img src={logo} className="logo-main" alt="logo" />
              <h1>{app.name}</h1>
            </Row>
            <span>Hunting the best GitHub projects</span>
          </div>
          <div className="col options-container align-self-center">
            <Row>
              <div className="col-5">
                <select
                  value={this.props.period}
                  onChange={event =>
                    this.props.handlePeriodChange(event.target.value)
                  }
                  className="form-control form-control-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <form
                onSubmit={event => event.preventDefault()}
                className="col-5 input-group"
              >
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
                    onClick={() =>
                      this.props.handleLanguageInput(this.state.language)
                    }
                    className="btn-sm"
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                </div>
              </form>
              <div className="col-1">{refreshIcon}</div>
              <div className="col-1">
                <FontAwesomeIcon
                  onClick={this.openAbout}
                  icon={faInfoCircle}
                  size="lg"
                  className="icon"
                />
              </div>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}
