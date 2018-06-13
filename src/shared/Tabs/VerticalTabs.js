import React from 'react';
import styled from 'styled-components';

class VerticalTabs extends React.Component {
  state = {
    activeTabIndex: this.props.defaultActiveTabIndex,
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.forcedTab !== undefined &&
      nextProps.forcedTab !== this.state.activeTabIndex &&
      nextProps.forcedTab !== this.props.forcedTab
    ) {
      if (typeof nextProps.forcedTab === 'number') {
        this.handleTabClick(nextProps.forcedTab);
      }
    }
  }

  handleTabClick = tabIndex => {
    this.setState((prevState, props) => ({
      activeTabIndex: tabIndex !== prevState.activeTabIndex && tabIndex,
    }));
  };

  renderChildrenWithTabsApiAsProps() {
    const { children } = this.props;
    const { activeTabIndex } = this.state;
    return React.Children.map(children, (child, index) =>
      React.cloneElement(child, {
        onClick: this.handleTabClick,
        tabIndex: index,
        isActive: index === activeTabIndex,
      })
    );
  }

  renderActiveTabContent() {
    const { children } = this.props;
    const { activeTabIndex } = this.state;
    if (children[activeTabIndex]) {
      return children[activeTabIndex].props.children;
    }
    return '';
  }

  render() {
    const { className } = this.props;
    return (
      //isos na mpoun edo col kai rows gia na xoriseis ta content kai tabs dynamically
      <StyledTabs className={className || ''}>
        <div>{this.renderActiveTabContent()}</div>
        <ul>{this.renderChildrenWithTabsApiAsProps()}</ul>
      </StyledTabs>
    );
  }
}

VerticalTabs.defaultProps = {
  defaultActiveTabIndex: 0,
};

const StyledTabs = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > div {
    width: 92%;
    float: right;
    height: 100%;
  }

  > ul {
    width: 60px;
    float: left;
    height: 100%;
    background: transparent;
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 2px solid ${props => props.theme.colors.tuscanRed};
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-left: none;
  }
`;

export default VerticalTabs;
