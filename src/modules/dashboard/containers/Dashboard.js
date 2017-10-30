import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

class Dashboard extends React.Component {
  state = {

  }
  componentWillMount(){
    console.log('Container!');
  }

  render(){
    return <DashboardLayout />;
  }

}

export default Dashboard;