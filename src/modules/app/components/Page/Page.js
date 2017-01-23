import React from 'react';
import {Grid} from 'react-bootstrap';

const Page = ({children}) => {
  return(
    <Grid>
      {children}
    </Grid>
  );
}

export default Page;