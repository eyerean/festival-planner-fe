import React from 'react';
import Button from '../../../shared/Button';
import CreateNewCard from '../../../shared/CreateNewCard';

const DashboardLayout = () => (<div>
    Dashboooooard blah
    <CreateNewCard>
      <p>Create New Festival</p>
    </CreateNewCard>

    <Button>I AM A BUTTON</Button>
    <Button primary>I AM A PRIMARY BUTTON</Button>
    <Button primary disabled>I AM A PRIMARY & disabled BUTTON</Button>

  </div>
);

export default DashboardLayout;