import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import {Form, FormGroup, ControlLabel,  Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
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


  componentWillMount() {
    if (this.props.isAuthenticated) {
      setTimeout(() => this.context.router.push('/'), 1500);
    } else {
      this.props.dispatchAuthenticateGet(localStorage.getItem('token')); 
    }
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.loginFetch.pending && nextProps.loginFetch.fulfilled){
      this.props.storeSession(nextProps.loginFetch.value.token, nextProps.loginFetch.value.user);
      this.props.authenticate();
      localStorage.setItem('token', nextProps.loginFetch.value.token);
      this.context.router.push('/');
    }
    if(this.props.authenticateFetch.pending && nextProps.authenticateFetch.fulfilled){
      this.props.authenticate();
      this.context.router.push('/');
    }
  }

  handleAuthenticate = (formData) => {
    this.props.dispatchLoginPost(formData)
  };

  render() {
    const { handleSubmit, error, submitting, loginFetch } = this.props;

    return (<Form onSubmit={handleSubmit(this.handleAuthenticate)}>
      <h2>Please sign in</h2>
      {loginFetch && loginFetch.reason && <p className="error">{loginFetch.reason.cause.message}</p>}
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
  isAuthenticated: selectors.isAuthenticated(state),
  token: selectors.getToken(state)
});

const mapDispatchToProps = (dispatch) => ({
  storeSession: bindActionCreators(actions.storeSession, dispatch),
  authenticate: bindActionCreators(actions.authenticate, dispatch)
});

const mapPropsToDispatchToProps = (props) => [
  {
    resource: 'login',
    method: 'POST',
    request: ({username, password}) => ({
      url: apiRoutes().login(),
      body: {
        name: username,
        password
      }
    })
  },{
    resource: 'authenticate',
    method: 'GET',
    request: (token) => ({
      url: apiRoutes().authenticate(token)
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
