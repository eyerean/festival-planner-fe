import styled from 'styled-components';

const TableHeader = styled.thead`
  tr {
    height: 40px;
    background-color: white;

    th {
      padding-right: 0 !important;
      min-width: 150px;
      max-width: 150px;
      font-size: 1.2em;
      border-bottom-width: 1px !important;
      text-align: center;

      &.small {
        min-width: 40px;
        max-width: 40px;
      }

      &.medium {
        min-width: 90px;
        max-width: 90px;
      }

      &:first-child {
        width: 19%;
        min-width: 0;
      }

      // &:nth-child(2) {
      //   min-width: 80px;
      // }

      // &:nth-child(3) {
      //   min-width: 170px;
      //   max-width: 170px;
      // }

      // &:last-child {
      //   width: 33%;
      //   min-width: 40px;
      // }
    }
  }
`;

export default TableHeader;
