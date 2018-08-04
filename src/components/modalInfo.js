import React, { Component } from 'react';
import Modal from 'react-modal';
import '../assets/scss/modal.css';
import logo from '../assets/img/logo.png';
import app from '../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrush, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';
import Switch from 'react-switch';

Modal.setAppElement('#root');

export default class ModalInfo extends Component {
  GITHUNT_REPO = 'https://git.io/fN2H2';
  CHROME_WEB_STORE =
    'https://chrome.google.com/webstore/detail/githunt/fkdnnmnoacofoklehaokcabccnbahfhm';
  FIREFOX_ADDON = 'https://addons.mozilla.org/en-US/firefox/addon/githunt';

  flushCache() {
    localStorage.clear();
    window.location.reload();
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
        color: this.props.darkMode ? '#A5A5A5' : '#212529'
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
            <img src={logo} alt="logo" />
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
            <a
              className="float-right"
              href={this.CHROME_WEB_STORE}
              target="_blank"
            >
              Chrome &nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="list-element">
            Firefox addon:
            <a
              className="float-right"
              href={this.FIREFOX_ADDON}
              target="_blank"
            >
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
            <Button
              onClick={this.flushCache}
              bsSize="small"
              bsStyle="danger"
              className="float-right"
            >
              <FontAwesomeIcon icon={faBrush} />
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}
