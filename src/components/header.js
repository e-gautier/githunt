import React, {Component} from 'react';
import logo from '../assets/img/logo.png';
import '../assets/css/header.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSyncAlt, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import ModalInfo from '../components/modalInfo';
import {Row} from 'react-bootstrap';
import app from '../../package.json';

export default class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openAbout: false
    }
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
    const refreshIcon = this.props.repos ?
      <FontAwesomeIcon onClick={this.props.refreshRepos} icon={faSyncAlt} size="lg" className="icon"/> :
      <FontAwesomeIcon icon={faSyncAlt} size="lg" className="icon" spin/>;

    return (
      <div>
        <ModalInfo
          openAbout={this.state.openAbout}
          closeAbout={this.closeAbout}
        />
        <Row>
          <div className="col">
            <Row className="title-container">
              <img src={logo} className="logo-main" alt="logo"/>
              <h1 className="title">{app.name}</h1>
            </Row>
            <span>Hunting the best GitHub projects</span>
          </div>
          <div className="col options-container align-self-center">
            <Row>
              <div className="col-5">
                <select value={this.props.period} onChange={(event) => this.props.handlePeriodChange(event.target.value)} className="form-control">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="col-5">
                <input
                  defaultValue={this.props.language ? this.props.language : ''}
                  onBlur={(event) => this.props.handleLanguageInput(event.target.value)}
                  type="text"
                  placeholder="All languages"
                  className="form-control"
                />
              </div>
              <div className="col-1">
                {refreshIcon}
              </div>
              <div className="col-1">
                <FontAwesomeIcon onClick={this.openAbout} icon={faInfoCircle} size="lg" className="icon"/>
              </div>
            </Row>
          </div>
        </Row>
      </div>
    );
  }
}