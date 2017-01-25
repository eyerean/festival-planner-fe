import React from 'react';
import {Grid} from 'react-bootstrap';
import NavBar from '../NavBar/NavBar';

const Page = ({children, isAuthenticated, onLogout, username}) => {
  return(<span>
     {isAuthenticated && <NavBar onLogout={onLogout} username={username}/> }
      <Grid>
        {children}
      </Grid>
    </span>
  );
}

export default Page;