import React from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import * as github from '../middlewares/github';

async function verifyAccessToken(form, props) {
  if (form.accessToken === '') {
    throw new SubmissionError({
      accessToken: 'form-control-empty',
      _error: 'empty'
    });
  }
  try {
    await github.isAccessTokenValid(form.accessToken);
  } catch (error) {
    throw new SubmissionError({
      accessToken: 'form-control-invalid',
      _error: 'invalid'
    });
  }

  return props.onSubmit(form);
}

const tokenInput = props => {
  let className = props.meta.error;
  if (!props.meta.error && props.submitSucceeded) {
    className = 'form-control-valid';
  }

  return (
    <input
      {...props.input}
      className={`form-control form-control-sm ${className}`}
      type={props.type}
      name="accessToken"
      placeholder={props.label}
    />
  );
};

const tokenForm = props => {
  const error = (error => {
    switch (error) {
      case 'empty':
        return 'btn-warning';
      case 'invalid':
        return 'btn-danger';
      default:
        return props.submitSucceeded ? 'btn-success' : 'btn-default';
    }
  })(props.error);

  return (
    <form
      className="input-group personal-access-token-input"
      onSubmit={props.handleSubmit(form => verifyAccessToken(form, props))}
    >
      <Field
        type="password"
        name="accessToken"
        component={tokenInput}
        label="token"
        submitSucceeded={props.submitSucceeded}
      />
      <div className="input-group-append">
        <button type="submit" className={`btn btn-sm ${error}`}>
          <FontAwesomeIcon icon={faUserCheck} />
          &nbsp;Verify
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'tokenForm'
})(tokenForm);
