import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import selectors from '../modules/login/selectors';

export const requireAuthentication = (Component) => {

  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool
    };

    componentWillMount() {
      this.checkAuth(this.props);
    };

    checkAuth(props) {
      if (!props.isAuthenticated) {
        this.props.history.push('/login');
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
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};
