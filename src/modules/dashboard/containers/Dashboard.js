import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

class Dashboard extends React.Component {
  state = {

  }
  componentWillMount(){
    console.log('DashboardContainer!');
  }

  render(){
    // NO 'DashboardLayout'! 
    // This is the Dashboard, and then we have small parts that complete the layout. 
    // The basic layout-divs are here [*if* needed, remember react v16 renders also arrays], 
    // and in them the components that should be displayed
    return <DashboardLayout />;
  }

}

export default Dashboard;