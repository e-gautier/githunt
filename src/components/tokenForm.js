import React from 'react';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import * as github from '../middlewares/github';

async function verifyAccessToken(values, callback) {
  try {
    await github.isAccessTokenValid(values.username, values.accessToken);
  } catch (error) {
    return { username: 'invalid', accessToken: 'invalid', [FORM_ERROR]: 'invalid' };
  }
  return callback(values);
}

const tokenForm = (props) => {
  const error = (submitError, submitSucceeded) => {
    if (submitError) {
      return 'btn-danger';
    }
    return submitSucceeded ? 'btn-success' : 'btn-light';
  };

  return (
    <Form onSubmit={(values) => verifyAccessToken(values, props.onSubmit)} initialValues={props.initialValues}>
      {({ handleSubmit, submitSucceeded, submitErrors, submitting }) => (
        <form className="input-group personal-access-token-input" onSubmit={handleSubmit}>
          <Field type="text" name="username">
            {({ input }) => (
              <input
                {...input}
                className={`form-control form-control-sm ${submitSucceeded && 'is-valid'} ${
                  submitErrors && submitErrors.username && `is-${submitErrors.username}`
                }`}
                type={input.type}
                name={input.name}
                placeholder="username"
              />
            )}
          </Field>
          <Field type="password" name="accessToken">
            {({ input }) => (
              <input
                {...input}
                className={`form-control form-control-sm ${submitSucceeded && 'is-valid'} ${
                  submitErrors && submitErrors.accessToken && `is-${submitErrors.accessToken}`
                }`}
                type={input.type}
                name={input.name}
                placeholder="token"
              />
            )}
          </Field>
          <div className="input-group-append">
            <button
              type="submit"
              className={`btn btn-sm border border-dark ${error(submitErrors, submitSucceeded)}`}
              disabled={submitting}
            >
              <FontAwesomeIcon icon={faUserCheck} />
              &nbsp;Verify
            </button>
          </div>
        </form>
      )}
    </Form>
  );
};

export default tokenForm;
