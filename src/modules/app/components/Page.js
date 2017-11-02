import React from 'react';
import {Grid} from 'react-bootstrap';
import NavBar from './NavBar';

const Page = ({children, isAuthenticated, onLogout, user}) => {
  return(<span>
     {isAuthenticated && <NavBar onLogout={onLogout} user={user}/> }
      <Grid>
        {children}
      </Grid>
    </span>
  );
}

export default Page;