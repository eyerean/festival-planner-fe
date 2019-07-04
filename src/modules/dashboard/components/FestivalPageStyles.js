import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 15px;

  td,
  th {
    text-align: center;
    border: 1px solid black;
    padding: 6px;
  }
`;

const Table = styled.table`
  margin: 30px auto;
  border-spacing: 5px;
  border-collapse: unset;
  background-color: ${props => props.theme.colors.ghostWhite};
`;

const HoverCell = styled.td`
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.xanadu};
    color: ${props => props.theme.colors.white};
  }

  ${props =>
    props.selected &&
    `
      background-color: ${props => props.theme.colors.xanadu};
      color: ${props => props.theme.colors.white}; 
  
      &:hover {
        background-color: ${props => props.theme.colors.russianGreen};
      }
    `};
`;

const HoverHeadCell = styled.th`
  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.colors.xanadu};
    color: ${props => props.theme.colors.white};
  }

  ${props =>
    props.selected &&
    `
      background-color: ${props => props.theme.colors.xanadu};
      color: ${props => props.theme.colors.white}; 
  
      &:hover {
        background-color: ${props => props.theme.colors.russianGreen};
      }
    `};
`;

const ButtonCell = styled.th`
  padding: 0 !important;

  > button {
    margin: 0;
    padding: 5px 40px;
  }
`;

const SecondHeadRow = styled.tr`
  font-weight: bold;
`;

export { Wrapper, Table, HoverCell, HoverHeadCell, ButtonCell, SecondHeadRow };
