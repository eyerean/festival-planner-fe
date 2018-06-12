import React from 'react';
import styled from 'styled-components';

class VerticalTabs extends React.Component {
  state = {
    activeTabIndex: this.props.defaultActiveTabIndex,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.forcedTab !== undefined && nextProps.forcedTab !== this.state.activeTabIndex) {
      if (typeof nextProps.forcedTab === 'number') {
        this.handleTabClick(nextProps.forcedTab);
      }
    }
  }

  handleTabClick = tabIndex => {
    this.setState((prevState, props) => ({
      activeTabIndex:
        tabIndex === prevState.activeTabIndex ? props.defaultActiveTabIndex : tabIndex,
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
      <StyledTabs className={className || ''}>
        <ul>{this.renderChildrenWithTabsApiAsProps()}</ul>
        <div>{this.renderActiveTabContent()}</div>
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

  > ul {
    background: transparent;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

export default VerticalTabs;
