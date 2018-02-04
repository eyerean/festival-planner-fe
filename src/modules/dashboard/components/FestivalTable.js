import React from 'react';
import styled from 'styled-components';
import {Table} from 'react-bootstrap';
import map from 'lodash/map';
import {TableHeader} from '../../../shared';

const FestivalTable = ({title, festivals}) => (
  <InlineTable>
    <TableHeader>
      <tr>
        <th>{title}</th>
      </tr>
    </TableHeader>
    <tbody>
    {map(festivals, fest => <tr key={fest._id}>
      <td>{fest.name}</td>
      </tr>)}
    </tbody>
  </InlineTable>
);

const InlineTable = styled(Table)`
  margin: 20px 0;
  display: inline-table;
`;

export default FestivalTable;