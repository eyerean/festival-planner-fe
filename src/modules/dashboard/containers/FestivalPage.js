import React from 'react';
import styled from 'styled-components';
import { Glyphicon } from 'react-bootstrap';
import { Button } from 'shared';

class FestivalPage extends React.Component {
  handleAddATimeslot = () => {
    console.log('adding a row');
  };

  render() {
    return (
      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>hours</th>
              <th colSpan="2">saturday</th>
              <ButtonCell>
                <Button primary onClick={undefined}>
                  <Glyphicon glyph="plus" />
                </Button>
              </ButtonCell>
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
            <tr>
              <ButtonCell>
                <Button primary onClick={this.handleAddATimeslot}>
                  <Glyphicon glyph="plus" />
                </Button>
              </ButtonCell>
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
    margin: 30px auto;
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

const ButtonCell = styled.th`
  padding: 0 !important;

  > button {
    margin: 0;
    padding: 5px 40px;
  }
`;
