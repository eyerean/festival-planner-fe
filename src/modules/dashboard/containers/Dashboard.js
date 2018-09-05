import React from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _every from 'lodash/every';
import _zipObject from 'lodash/zipObject';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _forEach from 'lodash/forEach';
import _includes from 'lodash/includes';
import _without from 'lodash/without';
import _concat from 'lodash/concat';
import apiRoutes from 'app/api/routes';
import validateRequiredFields from 'app/lib/validateRequiredFields';
import { Button /*, VerticalTabs, VerticalTab */ } from 'shared';
import { festivalFields } from '../lib/fields';
import { CreateFestModal } from '../components';
import selectors from '../selectors';
import actions from '../actions';

const isTabActive = (tab, activeTabs) => _includes(activeTabs, tab);

class Dashboard extends React.Component {
  state = {
    draftFestivals: [],
    plannedFestivals: [],
    ongoingFestivals: [],
    completedFestivals: [],
    showCreateModal: false,
    fields: festivalFields,
    invalidFields: [],
    requiredFields: ['festivalName', 'startDate', 'endDate'],
    errorText: '',
    activeTabs: [0],
  };

  componentDidMount() {
    this.props.dispatchFestivalsGet();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.festivalsFetch.pending && nextProps.festivalsFetch.fulfilled) {
      this.props.storeFestivals(nextProps.festivalsFetch.value);
      this.categorizeFestivals(nextProps.festivalsFetch.value);
    }

    if (this.props.createFestivalFetch.pending && nextProps.createFestivalFetch.rejected) {
      this.setState({
        errorText: _get(
          nextProps.createFestivalFetch,
          'reason.cause.error',
          'There was an error while creating this festival.'
        ),
      });
    }

    if (this.props.createFestivalFetch.pending && nextProps.createFestivalFetch.fulfilled) {
      this.setState({ showCreateModal: false });
      this.props.dispatchFestivalsGet();
    }
  }

  categorizeFestivals = allFestivals => {
    let draftFestivals = [];
    let plannedFestivals = [];
    let ongoingFestivals = [];
    let completedFestivals = [];

    _forEach(allFestivals, fest => {
      switch (fest.status) {
        case 'planned':
          plannedFestivals.push(fest);
          break;
        case 'ongoing':
          ongoingFestivals.push(fest);
          break;
        case 'completed':
          completedFestivals.push(fest);
          break;
        default:
          draftFestivals.push(fest);
          break;
      }
    });

    this.setState({
      draftFestivals,
      plannedFestivals,
      ongoingFestivals,
      completedFestivals,
    });
  };

  toggleCreateModal = () => {
    this.setState(prevState => ({
      showCreateModal: !prevState.showCreateModal,
      invalidFields: [], // reset invalid fields
      fields: festivalFields, // reset fields
      errorText: '', // reset error text
    }));
  };

  handleSubmitNewFestival = () => {
    const { fields, invalidFields, requiredFields } = this.state;
    const invalidFieldsTemp = validateRequiredFields(invalidFields, fields, requiredFields);
    this.setState({ invalidFields: invalidFieldsTemp, errorText: '' });

    //@TODO Send ISO date to the BE?
    if (_every(fields, value => value) && invalidFieldsTemp.length === 0) {
      this.setState({ invalidFields: [] });
      const cleanFields = _zipObject(_map(fields, f => f.name), _map(fields, f => f.value));
      this.props.dispatchCreateFestivalPost(cleanFields);
    }
  };

  handleChange = key => field => {
    const { fields, invalidFields } = this.state;
    const invalidFieldsTemp = _cloneDeep(invalidFields);
    const index = invalidFieldsTemp.indexOf(field.name);
    if (index > -1) {
      invalidFieldsTemp.splice(index, 1);
    }
    const newFields = _cloneDeep(fields);
    const foundInFields = _find(newFields, nf => nf.name === field.name);
    if (foundInFields) {
      newFields[key] = field;
    }

    this.setState({
      fields: newFields,
      invalidFields: invalidFieldsTemp,
      errorText: '',
    });
  };

  handleTabClick = tabClicked => {
    const { activeTabs } = this.state;
    if (_includes(activeTabs, tabClicked)) {
      this.setState(prevState => ({
        activeTabs: _without(prevState.activeTabs, tabClicked),
      }));
    } else {
      this.setState(prevState => ({
        activeTabs: _concat(prevState.activeTabs, tabClicked),
      }));
    }
  };

  render() {
    const {
      // draftFestivals,
      // plannedFestivals,
      // ongoingFestivals,
      // completedFestivals,
      showCreateModal,
      fields,
      invalidFields,
      requiredFields,
      errorText,
      activeTabs,
    } = this.state;
    const { createFestivalFetch } = this.props;

    return (
      <div>
        <Button primary big onClick={this.toggleCreateModal}>
          Create New Festival
        </Button>

        {/*       <VerticalTabs>
          <VerticalTab title="DRAFTS">
            <TabContent>yolo</TabContent>
          </VerticalTab>
          <VerticalTab title="PLANNED">
            <TabContent className="second-tab"> omg</TabContent>
          </VerticalTab>
          <VerticalTab title="ONGOING">
            <TabContent className="third-tab">lalala</TabContent>
          </VerticalTab>
          <VerticalTab title="FINISHED">
            <TabContent className="fourth-tab">tis gedaan</TabContent>
          </VerticalTab>
        </VerticalTabs>
*/}

        <TabContainer>
          <TabTitle onClick={() => this.handleTabClick(0)}>
            <a className={isTabActive(0, activeTabs) ? 'active' : ''}>
              <span>DRAFTS</span>
            </a>
          </TabTitle>
          <TabContent className={isTabActive(0, activeTabs) ? 'active' : ''}>
            that is a very big content with meaning and festivals
          </TabContent>
        </TabContainer>
        <TabContainer>
          <TabTitle onClick={() => this.handleTabClick(1)}>
            <a className={isTabActive(1, activeTabs) ? 'active' : ''}>
              <span>PLANNED</span>
            </a>
          </TabTitle>
          <TabContent>BLACH</TabContent>
        </TabContainer>
        <TabContainer>
          <TabTitle onClick={() => this.handleTabClick(2)}>
            <a className={isTabActive(2, activeTabs) ? 'active' : ''}>
              <span>ONGOING</span>
            </a>
          </TabTitle>
          <TabContent>stivals</TabContent>
        </TabContainer>
        <TabContainer>
          <TabTitle onClick={() => this.handleTabClick(3)}>
            <a className={isTabActive(3, activeTabs) ? 'active' : ''}>
              <span>FINISHED</span>
            </a>
          </TabTitle>
          <TabContent>that is a very big als</TabContent>
        </TabContainer>

        <CreateFestModal
          show={showCreateModal}
          onClose={this.toggleCreateModal}
          onSubmit={this.handleSubmitNewFestival}
          disabledBtn={createFestivalFetch.pending}
          fields={fields}
          requiredFields={requiredFields}
          invalidFields={invalidFields}
          handleChange={this.handleChange}
          errorText={errorText}
        />
      </div>
    );
  }
}

const TabContainer = styled.div`
  width: 100%;
  margin: 0;
`;

const TabContent = styled.div`
  border: 2px solid ${props => props.theme.colors.tuscanRed};
  background-color: ${props => props.theme.colors.lightBlue};
  height: 154px;
  padding: 10px;
  float: left;
  width: calc(100% - 60px);
`;

const TabTitle = styled.div`
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

  > a {
    cursor: pointer;
    outline: none;
    display: block;
    height: 150px;
    padding: 70px 0;
    text-decoration: none;
    border-bottom: 1px solid ${props => props.theme.colors.catawbaRed};
    background-color: transparent;
    color: ${props => props.theme.colors.desireRed};
    transition: background 0.2s cubic-bezier(0.16, 0.53, 0.67, 0.68),
      color 0.2s cubic-bezier(0.16, 0.53, 0.67, 0.68);

    &:hover {
      background-color: ${props => props.theme.colors.roseDust};
      color: ${props => props.theme.colors.ghostWhite};
    }

    &.active {
      background-color: ${props => props.theme.colors.desireRed};
      color: ${props => props.theme.colors.ghostWhite};

      &:hover {
        background-color: ${props => props.theme.colors.tuscanRed};
      }
    }

    > span {
      display: block;
      -webkit-transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      -ms-transform: rotate(-90deg);
      -o-transform: rotate(-90deg);
      transform: rotate(-90deg);

      text-transform: uppercase;
      font-size: 20px;
    }
  }
`;

const mapStateToProps = state => ({
  festivals: selectors.getFestivals(state),
});

const mapDispatchToProps = dispatch => ({
  storeFestivals: bindActionCreators(actions.storeFestivals, dispatch),
});

const mapPropsToDispatchToProps = props => [
  {
    resource: 'festivals',
    method: 'GET',
    request: () => ({
      url: apiRoutes().festivals(),
    }),
  },
  {
    resource: 'createFestival',
    method: 'POST',
    request: body => ({
      url: apiRoutes().festivals(),
      body,
    }),
  },
];

const enhance = compose(
  reduxFetch(mapPropsToDispatchToProps),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);

export default enhance(Dashboard);
