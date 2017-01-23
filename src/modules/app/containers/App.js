import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header/Header';
import Page from '../components/Page/Page';
import loginActions from '../../login/actions';
import loginSelectors from '../../login/selectors';

const HEIGHT = window.innerHeight;

class App extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleLogout = () => {
    this.props.logout();
  }

  render() {

    const {isAuthenticated, children, username } = this.props;
    return (
      <div style={{backgroundColor: '#f9ecec', height: HEIGHT}}>
        <Header isAuthenticated={isAuthenticated} onLogout={this.handleLogout} username={username}/>
        <Page children={children} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    isAuthenticated: loginSelectors.isAuthenticated(state),
    username: loginSelectors.getUsername(state)
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    logout: bindActionCreators(loginActions.logout, dispatch)
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

