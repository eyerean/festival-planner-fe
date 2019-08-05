import styled from 'styled-components';

const StyledDropdown = styled.span`
  .dropdown-toggle {
    background-color: transparent !important;
    border-radius: 1px;
    // margin-left: 10px !important;
    padding: 3px 10px;
    border: none;
  }

  &:hover {
    background-color: ${props => props.theme.colors.ashGreenGrey};
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
  }

  .dropdown-menu > li > a {
    color: ${props => props.theme.colors.ghostWhite}!important;
  }

  .dropdown-menu > li > a:hover {
    background-color: ${props => props.theme.colors.ashGreenGrey}!important;
    color: ${props => props.theme.colors.ghostWhite}!important;
  }
`;

export default StyledDropdown;
