import React, { Component } from 'react';
import logo from '../assets/img/logo.png';
import '../assets/scss/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Settings from './settings';
import app from '../../package.json';
import { connect } from 'react-redux';
import { PERIOD, setLanguageAndRefresh, setPeriodAndRefresh } from '../actions/settings';
import { setRepos } from '../actions/repos';
import LanguageForm from './languageForm';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsOpened: false,
    };
  }

  openSettings = () => {
    this.setState({
      settingsOpened: true,
    });
  };

  closeSettings = () => {
    this.setState({
      settingsOpened: false,
    });
  };

  render() {
    const refreshIcon =
      this.props.repos.repos.length > 0 ? (
        <FontAwesomeIcon onClick={() => this.props.setRepos([])} icon={faSyncAlt} size="lg" className="icon" />
      ) : (
        <FontAwesomeIcon icon={faSyncAlt} size="lg" className="icon" spin />
      );

    return (
      <div>
        <Settings settingsOpened={this.state.settingsOpened} closeSettings={this.closeSettings} />
        <div className="row">
          <div className="col-12 my-1 col-lg-4">
            <div className="d-flex justify-content-center">
              <img src={logo} className="logo-main" alt="logo" />
              <h1>{app.name}</h1>
            </div>
            <p className="text-center">Hunting the best GitHub projects</p>
          </div>
          <div className="col-lg-2" />
          <div className="col-12 col-lg-6 text-center row">
            <div className="col-12 p-1 col-lg-4 d-flex justify-content-evenly align-items-center">
              <select
                value={this.props.settings.period}
                onChange={(event) => this.props.setPeriodAndRefresh(event.target.value)}
                className="form-select form-select-sm"
              >
                <option value={PERIOD.DAILY}>Daily</option>
                <option value={PERIOD.WEEKLY}>Weekly</option>
                <option value={PERIOD.MONTHLY}>Monthly</option>
                <option value={PERIOD.YEARLY}>Yearly</option>
              </select>
            </div>
            <div className="col-12 p-1 col-lg-5 d-flex justify-content-evenly align-items-center">
              <LanguageForm
                onSubmit={(values) => this.props.setLanguageAndRefresh(values.language)}
                initialValues={{ language: this.props.settings.language }}
              />
            </div>
            <div className="col-12 p-1 col-lg-3 d-flex justify-content-evenly align-items-center">
              {refreshIcon}
              <FontAwesomeIcon onClick={this.openSettings} icon={faInfoCircle} size="lg" className="icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header = connect(
  (state) => {
    return state;
  },
  {
    setRepos,
    setLanguageAndRefresh,
    setPeriodAndRefresh,
  }
)(Header);

export default Header;
