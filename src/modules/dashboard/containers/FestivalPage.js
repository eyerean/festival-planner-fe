import React from 'react';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';

class FestivalPage extends React.Component {
  render() {
    console.log('render fest page props', this.props);
    return (
      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>hours</th>
              <th colSpan="2">saturday</th>
              <th>
                <Glyphicon glyph="plus" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td />
              <td>stage 1</td>
              <td>stage abc</td>
            </tr>
            <tr>
              <td>15:00 - 16:00</td>
              <td>band A</td>
              <td>-</td>
            </tr>
            <tr>
              <td>16:00 - 17:00</td>
              <td rowSpan="2">band ZZ</td>
              <td>famous band</td>
            </tr>
            <tr>
              <td>17:00 - 18:00</td>
              <td>allochiria</td>
            </tr>
          </tbody>
        </table>
      </Wrapper>
    );
  }
}

export default FestivalPage;

const Wrapper = styled.div`
  margin: 15px;

  table {
    border-spacing: 5px;
    border-collapse: unset;
  }

  td,
  th {
    text-align: center;
    border: 1px solid black;
    padding: 6px;
  }
`;
