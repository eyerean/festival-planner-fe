import styled from 'styled-components';

const StyledDropdown = styled.span`
  .dropdown-toggle {
    background-color: transparent !important;
    border-radius: 1px;
    margin-left: 10px !important;
    padding: 3px 10px;
    border: 1px solid ${props => props.theme.colors.ashGreenGrey};
    box-shadow: none !important;

    &:hover {
      background-color: ${props => props.theme.colors.ashGreenGrey}!important;
    }
  }

  .caret {
    margin-left: 10px;
  }

  .dropdown.open > a {
    background-color: ${props => props.theme.colors.russianGreen}!important;
    color: ${props => props.theme.colors.ghostWhite}!important;
  }

  .dropdown-menu {
    background-color: ${props => props.theme.colors.xanadu}!important;

    > li.active > a {
      background-color: ${props => props.theme.colors.russianGreen}!important;
    }

    > li > a:hover {
      background-color: ${props => props.theme.colors.ashGreenGrey}!important;
      color: ${props => props.theme.colors.ghostWhite}!important;
    }

    > li > a {
      color: ${props => props.theme.colors.ghostWhite}!important;
    }
  }
`;

const DropdownDetailsWrapper = styled.span`
  display: inline-block;
  margin-bottom: 10px;
  height: 20px;
`;

export default StyledDropdown;
export { DropdownDetailsWrapper };
