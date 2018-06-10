import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import _map from 'lodash/map';
import { TableHeader } from 'shared';

const FestivalTable = ({ title, festivals }) => (
  <InlineTable>
    <TableHeader>
      <tr>
        <th>{title}</th>
      </tr>
    </TableHeader>
    <tbody>
      {_map(festivals, fest => (
        <tr key={fest._id}>
          {/* @TODO: Keep only festivalName prop. Temporary use both names until db gets cleared */}
          <td>{fest.name || fest.festivalName}</td>
        </tr>
      ))}
    </tbody>
  </InlineTable>
);

const InlineTable = styled(Table)`
  margin: 20px 0;
  display: inline-table;
`;

export default FestivalTable;
