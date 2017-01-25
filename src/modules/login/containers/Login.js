import React from 'react';
import {connect} from 'react-redux';
import {FormGroup, ControlLabel,  Button, FormControl } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import actions from '../actions';
import selectors from '../selectors';
import './Login.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    submitting: false
  };

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

  handleUsernameChange = (e) => {
    this.setState({username: e.currentTarget.value})
  };

  handlePasswordChange = (e) => {
    this.setState({password: e.currentTarget.value})
  };

  handleSignInClick = (e) => {
    // e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    const {username, password, submitting} = this.state;
    return (<form>
      <h2>Please sign in.</h2>       
      <FormGroup controlId="username">
        <ControlLabel>Username</ControlLabel>
        <FormControl type="text" placeholder="Username" value={username} onChange={this.handleUsernameChange}/>
      </FormGroup>

      <FormGroup controlId="password">
        <ControlLabel>Password</ControlLabel>
        <FormControl type="password" placeholder="Password" value={password} onChange={this.handlePasswordChange}/>
      </FormGroup>

      <Button 
        bsStyle="primary" 
        type="submit" 
        onClick={this.handleSignInClick} 
        disabled={submitting}
      >
        {submitting ? <i className="fa fa-spinner fa-pulse fa-3x fa-fw" /> : `Sign in`}
      </Button>
    </form>);
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state)
});

const mapDispatchToProps = (dispatch) => ({
  login: bindActionCreators(actions.login, dispatch),
  storeCredentials: bindActionCreators(actions.storeCredentials, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
