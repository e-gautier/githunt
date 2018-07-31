import React, { Component } from 'react';
import Modal from 'react-modal';
import '../assets/css/modal.css';
import logo from '../assets/img/logo.png';
import app from '../../package.json';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBrush, faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';

const styles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

Modal.setAppElement('#root');

export default class ModalInfo extends Component {

  GITHUNT_REPO = 'https://git.io/fN2H2';
  CHROME_WEB_STORE = 'https://chrome.google.com/webstore/detail/githunt/fkdnnmnoacofoklehaokcabccnbahfhm';
  FIREFOX_ADDON = 'https://addons.mozilla.org/en-US/firefox/addon/githunt';

  flushCache() {
    localStorage.clear();
    window.location.reload();
  }

  render() {
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
          <img src={logo} alt="logo"/>
          <p>
            Please report any issue:
            <a className="float-right" target="_blank" href={this.GITHUNT_REPO}>
              <Button bsSize="small">
                <FontAwesomeIcon icon={faGithub}/>
              </Button>
            </a>
          </p>
          <p>Chrome web store: <a className="float-right" href={this.CHROME_WEB_STORE} target="_blank">Chrome&nbsp;<FontAwesomeIcon icon={faExternalLinkAlt}/></a></p>
          <p>Firefox addon: <a className="float-right" href={this.FIREFOX_ADDON} target="_blank">Firefox&nbsp;<FontAwesomeIcon icon={faExternalLinkAlt}/></a></p>
        </div>
        <div>
          <p>
            Invalid caches:
            <Button onClick={this.flushCache} bsSize="small" bsStyle="danger" className="float-right">
              <FontAwesomeIcon icon={faBrush}/>
            </Button>
          </p>
        </div>
      </Modal>
    );
  }
}