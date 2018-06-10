import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import { Button } from 'react-bootstrap';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _every from 'lodash/every';
import _zipObject from 'lodash/zipObject';
import _map from 'lodash/map';
import { DynamicForm } from 'modules/app/components';
import validateRequiredFields from 'app/lib/validateRequiredFields';
import apiRoutes from '../../../api/routes';
import LoginFormWrapper from '../components/LoginFormWrapper';
import LoginWrapper from '../components/LoginWrapper';
import WhiteBackground from '../components/WhiteBackground';
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
    if (this.props.loginFetch.pending && nextProps.loginFetch.fulfilled) {
      this.props.storeSession(nextProps.loginFetch.value.token, nextProps.loginFetch.value.user);
      this.props.authenticate();
      localStorage.setItem('token', nextProps.loginFetch.value.token);
      localStorage.setItem('user', nextProps.loginFetch.value.user);
      this.props.history.push('/');
    }
    if (this.props.authenticateFetch.pending && nextProps.authenticateFetch.fulfilled) {
      //token is correct so user is correct so store them
      this.props.storeSession(localStorage.getItem('token'), localStorage.getItem('user'));
      this.props.authenticate();
      this.props.history.push('/');
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
      const cleanFields = _zipObject(_map(fields, f => f.name), _map(fields, f => f.value));
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
      <LoginWrapper>
        <img src={'./images/hab_mountain.jpeg'} alt="hab_mountain" className="bg" />
        <WhiteBackground />
        <LoginFormWrapper>
          <h2>Please sign in</h2>
          <DynamicForm
            fields={fields}
            requiredFields={requiredFields}
            invalidFields={invalidFields}
            handleChange={this.handleChange}
          />
          <Button
            bsStyle="primary"
            type="submit"
            disabled={loginFetch.pending}
            style={{ float: 'right', marginTop: 20 }}
            onClick={this.handleLoginClick}
          >
            {loginFetch.pending ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> : 'Sign in'}
          </Button>
        </LoginFormWrapper>
      </LoginWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: selectors.isAuthenticated(state),
  token: selectors.getToken(state),
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Login);
