import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import {Form, FormGroup, ControlLabel,  Button, FormControl } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import apiRoutes from '../../../api/routes';
import actions from '../actions';
import selectors from '../selectors';
import './Login.css';

const required = value => value ? undefined : 'Required field.';

const Input = ({input, type, step, meta: {touched, error, warning}}) => (
  <div>
    <input {...input} type={type} step={step} className="form-control"/>
    {touched && ((error && <span className="error">{error}</span>))}
  </div>
);

class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuthenticated){
      console.log('isAuthenticated...');
      this.props.storeCredentials(this.state.username);
      this.context.router.push('/');
    }
  }

  handleAuthenticate = (formData) => {
    console.log('dispatchLoginPost', formData);
    this.props.dispatchAuthenticatePost(formData);
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;

    return (<Form onSubmit={handleSubmit(this.handleAuthenticate)}>
      <h2>Please sign in</h2>       
      <FormGroup controlId="username">
        <ControlLabel>Username</ControlLabel>
        <Field
          className="form-group"
          name="username"
          component={Input}
          type="text"
          placeholder="Username"
          validate={required}
        />
      </FormGroup>

      <FormGroup controlId="password">
        <ControlLabel>Password</ControlLabel>
        <Field
          className="form-group"
          name="password"
          component={Input}
          type="password"
          placeholder="Password"
          validate={required}
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
  storeCredentials: bindActionCreators(actions.storeCredentials, dispatch)
});

const mapPropsToDispatchToProps = (props) => [
  {
    resource: 'authenticate',
    method: 'POST',
    request: (credentials) => ({
      url: apiRoutes().authenticate(),
      body: credentials
    })
  }
];

const enhance = compose(
  reduxFetch(mapPropsToDispatchToProps),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'loginForm'
  })
);

export default enhance(Login);
