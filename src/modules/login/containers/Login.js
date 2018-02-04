import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import {FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import apiRoutes from '../../../api/routes';
import ErrorText from '../../../shared/ErrorText';
// import Button from '../../../shared/Button';
import LoginForm from '../components/LoginForm';
import WhiteBackground from '../components/WhiteBackground';
import actions from '../actions';
import selectors from '../selectors';

const validationRequired = value => value ? undefined : 'Required field.';

const Input = ({input, type, step, meta: {touched, error, warning}}) => (
  <div>
    <input {...input} type={type} step={step} className="form-control"/>
    {touched && error && <ErrorText>{error}</ErrorText>}
  </div>
);

class Login extends React.Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      setTimeout(() => this.props.history.push('/'), 1500);
    } else {
      this.props.dispatchAuthenticateGet(localStorage.getItem('token')); 
    }
  };

  componentWillReceiveProps(nextProps) {
    if(this.props.loginFetch.pending && nextProps.loginFetch.fulfilled){
      this.props.storeSession(nextProps.loginFetch.value.token, nextProps.loginFetch.value.user);
      this.props.authenticate();
      localStorage.setItem('token', nextProps.loginFetch.value.token);
      localStorage.setItem('user', nextProps.loginFetch.value.user);
      this.props.history.push('/');
    }
    if(this.props.authenticateFetch.pending && nextProps.authenticateFetch.fulfilled){
      //token is correct so user is correct so store them
      this.props.storeSession(localStorage.getItem('token'), localStorage.getItem('user'));
      this.props.authenticate();
      this.props.history.push('/');
    }
  }

  handleAuthenticate = (formData) => {
    this.props.dispatchLoginPost(formData)
  };

  render() {
    const { handleSubmit, error, submitting, loginFetch } = this.props;

    if(loginFetch.rejected && loginFetch.meta.status === 500){
      return <div>
        <p>Something went wrong on the server side of the application...</p>
        <a href='/'>Go back to home page.</a>
      </div>;
    }

    return (
      <div style={{position: 'relative'}}>
        <WhiteBackground />
        <LoginForm onSubmit={handleSubmit(this.handleAuthenticate)}>
          <h2>Please sign in</h2>
          {loginFetch.rejected && loginFetch.reason && <ErrorText>{loginFetch.reason.cause.message}</ErrorText>}
          <FormGroup controlId="username" validationState={error && error.username && 'error'}>
            <ControlLabel>Username</ControlLabel>
            <Field
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
              name="password"
              component={Input}
              type="password"
              placeholder="Password"
              validate={validationRequired}
            />
          </FormGroup>

          <Button 
            bsStyle="primary"
            type="submit"
            disabled={submitting}
            style={{float: 'right', marginTop: 20}}
          >
            {submitting ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> : 'Sign in'}
          </Button>
        </LoginForm>
      </div>
    );
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
