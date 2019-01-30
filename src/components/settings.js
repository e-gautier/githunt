import React, { Component } from 'react';
import Modal from 'react-modal';
import '../assets/scss/modal.css';
import logo from '../assets/img/logo.png';
import app from '../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrush, faUserCheck, faExternalLinkAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import * as github from '../middlewares/github';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { setPersonalAccessToken, setRepoPoolSizeAndRefresh, setTheme, THEME } from '../actions/settings';

Modal.setAppElement('#root');

class Settings extends Component {
  GITHUNT_REPO = process.env.REACT_APP_GITHUNT_REPO;
  CHROME_WEB_STORE = process.env.REACT_APP_CHROME_WEB_STORE;
  FIREFOX_ADDON = process.env.REACT_APP_FIREFOX_ADDON;

  constructor(props) {
    super(props);

    this.state = {
      formControlInputValidation: '',
      formControlButtonValidation: 'btn-default',
      accessToken: props.settings.accessToken
    };
  }

  reset() {
    localStorage.clear();
    window.location.reload();
  }

  async verifyAccessToken() {
    if (this.state.accessToken === '') {
      return this.setState({
        formControlInputValidation: 'form-control-empty',
        formControlButtonValidation: 'btn-warning'
      });
    }

    try {
      await github.isAccessTokenValid(this.state.accessToken);
      this.setState({
        formControlInputValidation: 'form-control-valid',
        formControlButtonValidation: 'btn-success'
      });
      this.props.setPersonalAccessToken(this.state.accessToken);
    } catch (error) {
      this.setState({
        formControlInputValidation: 'form-control-invalid',
        formControlButtonValidation: 'btn-danger'
      });
    }
  }

  render() {
    const styles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: this.props.settings.theme === THEME.DARK ? '#343a40' : '#fff',
        color: this.props.settings.theme === THEME.DARK ? '#A5A5A5' : '#212529',
        width: '500px'
      }
    };

    return (
      <Modal
        isOpen={this.props.openAbout}
        style={styles}
        contentLabel="Info"
        onRequestClose={this.props.closeAbout}
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
            <a className="float-right" target="_blank" href={this.GITHUNT_REPO}>
              <button className="btn btn-sm">
                <FontAwesomeIcon icon={faGithub} />
              </button>
            </a>
          </div>
          <div className="list-element">
            Chrome web store:
            <a className="float-right" href={this.CHROME_WEB_STORE} target="_blank">
              Chrome &nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="list-element">
            Firefox addon:
            <a className="float-right" href={this.FIREFOX_ADDON} target="_blank">
              Firefox &nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="list-element">
            Switch light/dark mode
            <div className="float-right" style={{ display: 'flex' }}>
              <div
                className={`theme-selector theme-selector-light ${this.props.settings.theme === THEME.LIGHT &&
                  'theme-selected'}`}
                onClick={() => this.props.setTheme(THEME.LIGHT)}
              />
              <div
                className={`theme-selector theme-selector-dark ${this.props.settings.theme === THEME.DARK &&
                  'theme-selected'}`}
                onClick={() => this.props.setTheme(THEME.DARK)}
              />
            </div>
          </div>
          <div className="list-element">
            Invalid caches:
            <button onClick={this.reset} className="btn btn-danger btn-sm float-right">
              <FontAwesomeIcon icon={faBrush} />
            </button>
          </div>
          <div className="list-element">
            Repos pool size:
            <select
              value={this.props.settings.repoAmount}
              onChange={event => this.props.setRepoPoolSizeAndRefresh(event.target.value)}
              className="form-control form-control-sm select-amount"
            >
              <option>3</option>
              <option>12</option>
              <option>30</option>
              <option>60</option>
            </select>
          </div>
          <div className="list-element">
            <FontAwesomeIcon data-tip data-for="tooltip-access-token" icon={faQuestionCircle} />
            &nbsp;Personal access token:
            <ReactTooltip
              id="tooltip-access-token"
              place="right"
              type={this.props.settings.theme.toLowerCase()}
              effect="solid"
            >
              <span>
                <strong>No scopes needed at all</strong>
              </span>
            </ReactTooltip>
            <form className="input-group personal-access-token-input">
              <input
                className={`form-control form-control-sm ${this.state.formControlInputValidation}`}
                type="password"
                value={this.state.accessToken}
                onChange={event => this.setState({ accessToken: event.target.value })}
              />
              <div className="input-group-append">
                <button
                  onClick={() => this.verifyAccessToken()}
                  className={`btn btn-sm ${this.state.formControlButtonValidation}`}
                >
                  <FontAwesomeIcon icon={faUserCheck} />
                  &nbsp;Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

Settings = connect(
  state => {
    return state;
  },
  {
    setTheme,
    setRepoPoolSizeAndRefresh,
    setPersonalAccessToken
  }
)(Settings);

export default Settings;
