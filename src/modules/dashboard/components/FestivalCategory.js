import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import _map from 'lodash/map';

const FestivalCategory = ({ categoryTitle, festivals, onFestivalClick }) => (
  <Col lg={3} md={6} sm={12} style={{ padding: 0 }}>
    <Box>
      <h3>{categoryTitle}</h3>
      <List>
        {festivals.length > 0 &&
          _map(festivals, fest => (
            <ListItem
              key={fest._id}
              onClick={() => {
                onFestivalClick(fest);
              }}
            >
              {fest.name}
            </ListItem>
          ))}
      </List>
    </Box>
  </Col>
);

export default FestivalCategory;

const Box = styled.div`
  > h3 {
    text-align: center;
    font-weight: bold;
    margin-top: 8px;
  }

  background-color: ${props => props.theme.colors.lightGreenGray};
  border-radius: 4px;
  border: 4px solid ${props => props.theme.colors.ghostWhite};
  padding: 10px 20px;
  height: 300px;
  margin: 15px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-left: 20px;
`;

const ListItem = styled.li`
  font-size: 18px;
  padding: 1.4px;

  &:hover {
    cursor: pointer;
    color: white;
  }
`;
