import React from 'react';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import { Row, Col } from 'react-bootstrap';
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
import { Button } from 'shared';
import { festivalFields } from '../lib/fields';
import { CreateFestModal, FestivalCategory } from '../components';
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
      draftFestivals,
      plannedFestivals,
      ongoingFestivals,
      completedFestivals,
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

        <Row>
          <FestivalCategory categoryTitle="DRAFTS" festivals={draftFestivals} />
          <FestivalCategory categoryTitle="PLANNED" festivals={plannedFestivals} />
          <FestivalCategory categoryTitle="ONGOING" festivals={ongoingFestivals} />
          <FestivalCategory categoryTitle="COMPLETED" festivals={completedFestivals} />
        </Row>

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
