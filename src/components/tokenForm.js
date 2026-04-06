import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import * as github from '../middlewares/github';

const STATUS = {
  IDLE: 'IDLE',
  VERIFYING: 'VERIFYING',
  VALID: 'VALID',
  INVALID: 'INVALID',
};

class TokenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue || '',
      status: props.initialValue ? STATUS.VALID : STATUS.IDLE,
    };
    this.debounceTimer = null;
    this.abortController = null;
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value, status: STATUS.IDLE });

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }

    if (!value) {
      this.props.onVerified('');
      return;
    }

    this.debounceTimer = setTimeout(() => this.verify(value), 500);
  };

  async verify(token) {
    if (this.abortController) {
      this.abortController.abort();
    }
    this.abortController = new AbortController();

    this.setState({ status: STATUS.VERIFYING });
    try {
      await github.isAccessTokenValid(token, {
        signal: this.abortController.signal,
      });
      this.setState({ status: STATUS.VALID });
      this.props.onVerified(token);
    } catch (error) {
      if (error.name === 'AbortError') {
        return;
      }
      this.setState({ status: STATUS.INVALID });
      this.props.onVerified('');
    }
  }

  componentWillUnmount() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  render() {
    const { status, value } = this.state;

    const statusClass = status === STATUS.VALID ? 'is-valid' : status === STATUS.INVALID ? 'is-invalid' : '';

    const statusIcon =
      status === STATUS.VERIFYING ? (
        <FontAwesomeIcon icon={faSyncAlt} spin />
      ) : status === STATUS.VALID ? (
        <FontAwesomeIcon icon={faCheck} className="text-success" />
      ) : status === STATUS.INVALID ? (
        <FontAwesomeIcon icon={faTimes} className="text-danger" />
      ) : null;

    return (
      <div className="input-group personal-access-token-input">
        <input
          className={`form-control form-control-sm ${statusClass}`}
          type="password"
          placeholder="paste your token here"
          value={value}
          onChange={this.handleChange}
        />
        {statusIcon && (
          <span className="input-group-text" style={{ minWidth: '2.5rem', justifyContent: 'center' }}>
            {statusIcon}
          </span>
        )}
      </div>
    );
  }
}

export default TokenForm;
