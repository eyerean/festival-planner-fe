import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import apiRoutes from '../../../api/routes';
import DashboardLayout from '../components/DashboardLayout';
import selectors from '../selectors';
import actions from '../actions';

class Dashboard extends React.Component {
  componentDidMount(){
    this.props.dispatchFestivalsGet();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if(this.props.festivalsFetch.pending && nextProps.festivalsFetch.fulfilled){
      this.props.storeFestivals(nextProps.festivalsFetch.value);
    }
  }

  render(){
    // NO 'DashboardLayout'! 
    // This is the Dashboard, and then we have small parts that complete the layout. 
    // The basic layout-divs are here [*if* needed, remember react v16 renders also arrays], 
    // and in them the components that should be displayed
    return <DashboardLayout />;
  }
}

const mapStateToProps = (state) => ({
  festivals: selectors.getFestivals(state)
});

const mapDispatchToProps = (dispatch) => ({
  storeFestivals: bindActionCreators(actions.storeFestivals, dispatch)
});

const mapPropsToDispatchToProps = (props) => [
  {
    resource: 'festivals',
    method: 'GET',
    request: () => ({
      url: apiRoutes().festivals()
    })
  }
];

const enhance = compose(
  reduxFetch(mapPropsToDispatchToProps),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Dashboard);
