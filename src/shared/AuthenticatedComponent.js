import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import selectors from 'modules/login/selectors';
import appActions from 'modules/app/actions';

export const requireAuthentication = Component => {
  class AuthenticatedComponent extends React.Component {
    static propTypes = {
      isAuthenticated: PropTypes.bool,
    };

    componentWillMount() {
      this.checkAuth(this.props);
    }

    checkAuth(props) {
      if (!props.isAuthenticated) {
        if (props.location) {
          this.props.storeLastLocation(props.location.pathname);
        }
        this.props.history.push('/login');
      }
    }

    render() {
      if (this.props.isAuthenticated) {
        return <Component {...this.props} />;
      } else {
        return <i className="centered-spinner fa fa-spinner fa-pulse fa-3x fa-fw" />;
      }
    }
  }

  const mapStateToProps = state => ({
    isAuthenticated: selectors.isAuthenticated(state),
  });

  const mapDispatchToProps = dispatch => ({
    storeLastLocation: bindActionCreators(appActions.storeLastLocation, dispatch),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthenticatedComponent);
};
