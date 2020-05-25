import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import {
  cloneDeep as _cloneDeep,
  find as _find,
  every as _every,
  zipObject as _zipObject,
  map as _map,
} from 'lodash';
import apiRoutes from 'app/api/routes';
import validateRequiredFields from 'app/lib/validateRequiredFields';
import { DynamicForm, Button, SpinningGlyphicon } from 'shared';
import appSelectors from 'modules/app/selectors';
import { LoginFormWrapper } from '../components';
import actions from '../actions';
import selectors from '../selectors';
import { loginFields } from '../lib/fields';

class Login extends React.Component<Props, State> {
  state = {
    fields: loginFields,
    requiredFields: ['username', 'password'],
    invalidFields: [],
  };

  componentWillMount() {
    if (this.props.isAuthenticated) {
      setTimeout(() => this.props.history.push('/'), 1500);
    } else {
      this.props.dispatchAuthenticateGet(localStorage.getItem('token'));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loginFetch: prevLoginFetch, authenticateFetch: prevAuthFetch } = this.props;
    const { loginFetch, authenticateFetch: authFetch, locationBeforeTransitions } = nextProps;

    if (prevLoginFetch.pending && loginFetch.fulfilled) {
      this.props.storeSession(loginFetch.value.token, loginFetch.value.user);
      this.props.authenticate();
      localStorage.setItem('token', loginFetch.value.token);
      localStorage.setItem('user', loginFetch.value.user);
      this.props.history.push('/');
    }
    if (prevAuthFetch.pending && authFetch.fulfilled) {
      //token is correct so user is correct so store them
      this.props.storeSession(localStorage.getItem('token'), localStorage.getItem('user'));
      this.props.authenticate();
      this.props.history.push(locationBeforeTransitions ? locationBeforeTransitions : '/');
    }
  }

  handleChange = key => field => {
    const { fields, invalidFields } = this.state;
    const invalidFieldsTemp = _cloneDeep(invalidFields);
    const index = invalidFieldsTemp.indexOf(field.name);
    if (index > -1) {
      invalidFieldsTemp.splice(index, 1);
    }
    const newFields = _cloneDeep(fields);
    const foundInFields = _find(newFields, nf => nf.name === field.name);
    if (foundInFields) {
      newFields[key] = field;
    }

    this.setState({
      fields: newFields,
      invalidFields: invalidFieldsTemp,
      errorText: '',
    });
  };

  handleLoginClick = () => {
    const { fields, invalidFields, requiredFields } = this.state;
    const invalidFieldsTemp = validateRequiredFields(invalidFields, fields, requiredFields);
    this.setState({ invalidFields: invalidFieldsTemp, errorText: '' });

    if (_every(fields, value => value) && invalidFieldsTemp.length === 0) {
      this.setState({ invalidFields: [] });
      const cleanFields = _zipObject(
        _map(fields, f => f.name),
        _map(fields, f => f.value)
      );
      this.props.dispatchLoginPost(cleanFields);
    }
  };

  render() {
    const { loginFetch } = this.props;
    const { fields, requiredFields, invalidFields } = this.state;

    if (loginFetch.rejected && loginFetch.meta.status === 500) {
      return (
        <div>
          <p>Something went wrong on the server side of the application...</p>
          <a href="/">Go back to home page.</a>
        </div>
      );
    }

    return (
      <LoginFormWrapper>
        <DynamicForm
          fields={fields}
          requiredFields={requiredFields}
          invalidFields={invalidFields}
          handleChange={this.handleChange}
        />
        <div style={{ display: 'inlineBlock' }}>
          <Button
            primary
            type="submit"
            disabled={loginFetch.pending}
            onClick={this.handleLoginClick}
          >
            {loginFetch.pending ? <SpinningGlyphicon glyph="refresh" spin /> : 'Sign in'}
          </Button>
        </div>
      </LoginFormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: selectors.isAuthenticated(state),
  token: selectors.getToken(state),
  locationBeforeTransitions: appSelectors.getLocationBeforeTransitions(state),
});

const mapDispatchToProps = dispatch => ({
  storeSession: bindActionCreators(actions.storeSession, dispatch),
  authenticate: bindActionCreators(actions.authenticate, dispatch),
});

const mapPropsToDispatchToProps = props => [
  {
    resource: 'login',
    method: 'POST',
    request: ({ username, password }) => ({
      url: apiRoutes().login(),
      body: {
        name: username,
        password,
      },
    }),
  },
  {
    resource: 'authenticate',
    method: 'GET',
    request: token => ({
      url: apiRoutes().authenticate(token),
    }),
  },
];

const enhance = compose(
  reduxFetch(mapPropsToDispatchToProps),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Login);
