import React, { Component } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../assets/scss/settings.css';
import logo from '../assets/img/logo.png';
import app from '../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrush, faExternalLinkAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { setUsername, setPersonalAccessToken, setRepoPoolSizeAndRefresh, setTheme, THEME } from '../actions/settings';
import TokenForm from './tokenForm';

class Settings extends Component {
  GITHUNT_REPO = process.env.REACT_APP_GITHUNT_REPO;
  CHROME_WEB_STORE = process.env.REACT_APP_CHROME_WEB_STORE;
  FIREFOX_ADDON = process.env.REACT_APP_FIREFOX_ADDON;

  reset() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    const styles = {
      modal: {
        backgroundColor: this.props.settings.theme === THEME.DARK ? '#343a40' : '#fff',
        color: this.props.settings.theme === THEME.DARK ? '#A5A5A5' : '#212529',
      },
    };

    return (
      <Modal
        open={this.props.settingsOpened}
        styles={styles}
        contentLabel="Info"
        onClose={this.props.closeSettings}
        closeTimeoutMS={100}
      >
        <h2 className="aboutHeader">About Githunt</h2>
        <h3 className="aboutHeader">v{app.version}</h3>
        <div>
          <div className="list-element">
            <img src={logo} alt="logo" id="logo" />
          </div>
          <div className="list-element">
            Please report any issue:
            <a className="float-end" target="_blank" rel="noopener noreferrer" href={this.GITHUNT_REPO}>
              <button className="btn btn-sm btn-light border border-dark">
                <FontAwesomeIcon icon={faGithub} />
              </button>
            </a>
          </div>
          <div className="list-element">
            Chrome web store:
            <a className="float-end" href={this.CHROME_WEB_STORE} target="_blank" rel="noopener noreferrer">
              Chrome &nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="list-element">
            Firefox addon:
            <a className="float-end" href={this.FIREFOX_ADDON} target="_blank" rel="noopener noreferrer">
              Firefox &nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="list-element">
            Switch light/dark mode
            <div className="float-end" style={{ display: 'flex' }}>
              <div
                className={`theme-selector theme-selector-light ${
                  this.props.settings.theme === THEME.LIGHT && 'theme-selected'
                }`}
                onClick={() => this.props.setTheme(THEME.LIGHT)}
              />
              <div
                className={`theme-selector theme-selector-dark ${
                  this.props.settings.theme === THEME.DARK && 'theme-selected'
                }`}
                onClick={() => this.props.setTheme(THEME.DARK)}
              />
            </div>
          </div>
          <div className="list-element">
            Invalid caches:
            <button onClick={this.reset} className="btn btn-danger btn-sm float-end">
              <FontAwesomeIcon icon={faBrush} />
            </button>
          </div>
          <div className="list-element">
            Repos pool size:
            <select
              value={this.props.settings.repoAmount}
              onChange={(event) => this.props.setRepoPoolSizeAndRefresh(event.target.value)}
              className="form-select form-select-sm select-amount"
            >
              <option>3</option>
              <option>12</option>
              <option>30</option>
              <option>60</option>
            </select>
          </div>
          <div className="list-element">
            &nbsp;Personal access token:
            <div className={`alert alert-${this.props.settings.theme.toLowerCase()} border border-dark py-2`}>
              <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
              No scopes are needed.
            </div>
            <TokenForm
              onSubmit={(values) => {
                this.props.setUsername(values.username);
                this.props.setPersonalAccessToken(values.accessToken);
              }}
              initialValues={{ accessToken: this.props.settings.accessToken, username: this.props.settings.username }}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

Settings = connect(
  (state) => {
    return state;
  },
  {
    setTheme,
    setRepoPoolSizeAndRefresh,
    setUsername,
    setPersonalAccessToken,
  }
)(Settings);

export default Settings;
