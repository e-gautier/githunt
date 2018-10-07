import React, { Component } from 'react';
import Modal from 'react-modal';
import '../assets/scss/modal.css';
import logo from '../assets/img/logo.png';
import app from '../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrush, faUserCheck, faExternalLinkAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button, FormControl } from 'react-bootstrap';
import Switch from 'react-switch';
import GithubService from '../services/githubService';
import ReactTooltip from 'react-tooltip';

Modal.setAppElement('#root');

export default class ModalInfo extends Component {
  GITHUNT_REPO = process.env.REACT_APP_GITHUNT_REPO;
  CHROME_WEB_STORE = process.env.REACT_APP_CHROME_WEB_STORE;
  FIREFOX_ADDON = process.env.REACT_APP_FIREFOX_ADDON;

  constructor(props) {
    super(props);

    this.state = {
      formControlInputValidation: '',
      formControlButtonValidation: 'default'
    };
  }

  flushCache() {
    localStorage.clear();
    window.location.reload();
  }

  verifyAccessToken(token) {
    if (token === '') {
      return this.setState({
        formControlInputValidation: 'form-control-empty',
        formControlButtonValidation: 'warning'
      });
    }

    const githubService = new GithubService();
    githubService.isAccessTokenValid(token).then(response => {
      if (response.status === 200) {
        this.setState({
          formControlInputValidation: 'form-control-valid',
          formControlButtonValidation: 'success'
        });
      } else {
        this.setState({
          formControlInputValidation: 'form-control-invalid',
          formControlButtonValidation: 'danger'
        });
      }
    });
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
        backgroundColor: this.props.darkMode ? '#343a40' : '#fff',
        color: this.props.darkMode ? '#A5A5A5' : '#212529',
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
              <Button bsSize="small">
                <FontAwesomeIcon icon={faGithub} />
              </Button>
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
            <Switch
              className="float-right"
              onChange={checked => this.props.switchMode(checked)}
              checked={this.props.darkMode}
              onColor="#111111"
              onHandleColor="#555555"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              height={10}
              width={40}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            />
          </div>
          <div className="list-element">
            Invalid caches:
            <Button onClick={this.flushCache} bsSize="small" bsStyle="danger" className="float-right">
              <FontAwesomeIcon icon={faBrush} />
            </Button>
          </div>
          <div className="list-element">
            Repos pool size:
            <select
              value={this.props.repoAmount}
              onChange={event => this.props.handleRepoAmountChange(event.target.value)}
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
            <ReactTooltip id="tooltip-access-token" place="right" type="light" effect="solid">
              <span>
                <strong>No scopes needed at all</strong>
              </span>
            </ReactTooltip>
            <form className="input-group personal-access-token-input">
              <FormControl
                className={`form-control-sm ${this.state.formControlInputValidation}`}
                type="password"
                value={this.props.accessToken}
                onChange={event => this.props.handleAccessTokenChange(event.target.value)}
              />
              <div className="input-group-append">
                <Button
                  bsStyle={this.state.formControlButtonValidation}
                  onClick={() => this.verifyAccessToken(this.props.accessToken)}
                  className="btn-sm"
                >
                  <FontAwesomeIcon icon={faUserCheck} />
                  &nbsp;Verify
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
