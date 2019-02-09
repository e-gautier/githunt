import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const LanguageForm = props => {
  return (
    <form onSubmit={props.handleSubmit} className="input-group">
      <Field
        component="input"
        name="language"
        type="text"
        placeholder="All languages"
        className="form-control form-control-sm"
      />
      <div className="input-group-append">
        <button type="submit" title="Valid" className="btn btn-sm btn-light" style={{ zIndex: 'unset' }}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'language'
})(LanguageForm);
