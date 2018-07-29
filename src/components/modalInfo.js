import React, { Component } from 'react';
import Modal from 'react-modal';
import '../assets/css/modal.css';
import logo from '../assets/img/logo.png';
import app from '../../package.json';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBrush} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

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

  GITHUNT_REPO = 'https://github.com/e-gautier';

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
              <button className="btn btn-sm">
                <FontAwesomeIcon icon={faGithub}/>
              </button>
            </a>
          </p>
          <p>Chrome web store:</p>
          <p>Firefox addon:</p>
        </div>
        <div>
          <p>
            Invalid caches:
            <button onClick={this.flushCache} className="btn btn-sm btn-danger float-right">
              <FontAwesomeIcon icon={faBrush}/>
            </button>
          </p>
        </div>
      </Modal>
    );
  }
}