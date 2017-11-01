import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AppWrapper from '../components/AppWrapper';
import Header from '../components/Header/Header';
import Page from '../components/Page/Page';
import loginActions from '../../login/actions';
import loginSelectors from '../../login/selectors';

const HEIGHT = window.innerHeight;

class App extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  componentWillMount(){
    if(!this.props.isAuthenticated){
      this.context.router.push('/login');
    }
  }

  componentWillReceiveProps(nextProps){
   if(this.props.isAuthenticated && !nextProps.isAuthenticated){
      //if for some reason user is forced un-authenticated, go to login screen
      this.context.router.push('/login');
    } 
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.logout();
  }

  render() {
    const {isAuthenticated, children, user } = this.props;
    return (
      <AppWrapper height={HEIGHT}>
        <Header />
        <Page children={children} isAuthenticated={isAuthenticated} onLogout={this.handleLogout} user={user}/>
      </AppWrapper>
    );
  }
}


const mapStateToProps = (state) => {
  return ({
    isAuthenticated: loginSelectors.isAuthenticated(state),
    user: loginSelectors.getUser(state)
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    logout: bindActionCreators(loginActions.logout, dispatch)
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

