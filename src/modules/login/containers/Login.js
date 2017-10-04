import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import {Form, FormGroup, ControlLabel,  Button, FormControl } from 'react-bootstrap';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import apiRoutes from '../../../api/routes';
import actions from '../actions';
import selectors from '../selectors';
import './Login.css';

const validationRequired = value => value ? undefined : 'Required field.';

const Input = ({input, type, step, meta: {touched, error, warning}}) => (
  <div>
    <input {...input} type={type} step={step} className="form-control"/>
    {touched && error && <span className="error">{error}</span>}
  </div>
);

class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.authenticateFetch.fulfilled && this.props.authenticateFetch.pending){
      this.props.storeSession(nextProps.authenticateFetch.value.token, nextProps.authenticateFetch.value.user);
      this.context.router.push('/');
    }
    if(this.props.authenticateFetch.pending && nextProps.authenticateFetch.rejected){
      if (nextProps.authenticateFetch.reason.cause) {
        console.log('do.i.get.here', nextProps);
        // throw new SubmissionError({username: 'wrong', _error: nextProps.authenticateFetch.reason.cause.message});
      }
    }
  }

  handleAuthenticate = (formData) => {
    this.props.dispatchAuthenticatePost(formData)
  };

  render() {
    const { handleSubmit, pristine, reset, dirty, anyTouched, error, submitting, authenticateFetch } = this.props;

    return (<Form onSubmit={handleSubmit(this.handleAuthenticate)}>
      <h2>Please sign in</h2>
      {authenticateFetch.reason && <p className="error">{authenticateFetch.reason.cause.message}</p>}
      <FormGroup controlId="username" validationState={error && error.username && 'error'}>
        <ControlLabel>Username</ControlLabel>
        <Field
          className="form-group"
          name="username"
          component={Input}
          type="text"
          placeholder="Username"
          validate={validationRequired}
        />
      </FormGroup>

      <FormGroup controlId="password" validationState={error && error.password && 'error'}>
        <ControlLabel>Password</ControlLabel>
        <Field
          className="form-group"
          name="password"
          component={Input}
          type="password"
          placeholder="Password"
          validate={validationRequired}
        />
      </FormGroup>

      <Button
        type="submit"
        bsStyle="primary"
        disabled={submitting}
      >
        {submitting ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> : 'Sign in'}
      </Button>
    </Form>);
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => ({
  storeSession: bindActionCreators(actions.storeSession, dispatch)
});

const mapPropsToDispatchToProps = (props) => [
  {
    resource: 'authenticate',
    method: 'POST',
    request: ({username, password}) => ({
      url: apiRoutes().authenticate(),
      body: {
        name: username,
        password
      }
    })
  }
];

const enhance = compose(
  reduxFetch(mapPropsToDispatchToProps),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'loginForm',
    touchOnChange: true,
    touchOnBlur: true
  })
);

export default enhance(Login);
