import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import _map from 'lodash/map';

const FestivalCategory = ({ categoryTitle, festivals }) => (
  <Col lg={3} md={6} sm={12} style={{ padding: 0 }}>
    <Box>
      <h3>{categoryTitle}</h3>
      <ul>
        {festivals.length > 0 && _map(festivals, fest => <li key={fest._id}>{fest.name}</li>)}
      </ul>
    </Box>
  </Col>
);

export default FestivalCategory;

const Box = styled.div`
  > h3 {
    text-align: center;
  }

  background-color: ${props => props.theme.colors.paleAqua};
  border-radius: 4px;
  border: 4px solid ${props => props.theme.colors.queenBlue};
  padding: 10px 20px;
  height: 300px;
  margin: 15px;
`;
