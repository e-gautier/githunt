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
      openAbout: false
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

  render() {
    const refreshIcon =
      this.props.repos.repos.length > 0 ? (
        <FontAwesomeIcon onClick={() => this.props.setRepos([])} icon={faSyncAlt} size="lg" className="icon" />
      ) : (
        <FontAwesomeIcon icon={faSyncAlt} size="lg" className="icon" spin />
      );

    return (
      <div>
        <Settings openAbout={this.state.openAbout} closeAbout={this.closeAbout} />
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
                  value={this.props.settings.period}
                  onChange={event => this.props.setPeriodAndRefresh(event.target.value)}
                  className="form-control form-control-sm"
                >
                  <option value={PERIOD.DAILY}>Daily</option>
                  <option value={PERIOD.WEEKLY}>Weekly</option>
                  <option value={PERIOD.MONTHLY}>Monthly</option>
                  <option value={PERIOD.YEARLY}>Yearly</option>
                </select>
              </div>
              <div className="mx-1">
                <LanguageForm
                  onSubmit={form => this.props.setLanguageAndRefresh(form.language)}
                  initialValues={{ language: this.props.settings.language }}
                />
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

Header = connect(
  state => {
    return state;
  },
  {
    setRepos,
    setLanguageAndRefresh,
    setPeriodAndRefresh
  }
)(Header);

export default Header;
