import React from 'react';
import {connect} from 'react-redux';
// import { bindActionCreators } from 'redux';
import selectors from '../modules/login/selectors';
// import actions from '../actions';
// import appSelectors from '../../app/selectors';

export const requireAuthentication = (Component) => {

  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: React.PropTypes.bool
    };

    static contextTypes = {
      router: React.PropTypes.object.isRequired
    };

    componentWillMount() {
      this.checkAuth(this.props);
      // this.props.storeRedirectAfterLoginLocation(this.props.locationBeforeTransitions.pathname);
    };

    checkAuth(props) {
      if (!props.isAuthenticated) {
        this.context.router.push('/login');
      }
    };


    render() {
      if (this.props.isAuthenticated) {
        return <Component {...this.props}/>;
      } else {
        return <i className="centered-spinner fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      }
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: selectors.isAuthenticated(state),
    // locationBeforeTransitions: appSelectors.getLocationBeforeTransitions(state)
  });

  const mapDispatchToProps = (dispatch) => ({
    // storeRedirectAfterLoginLocation: bindActionCreators(actions.storeRedirectAfterLoginLocation, dispatch)
  });

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
};
