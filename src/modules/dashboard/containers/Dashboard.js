import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import { Row } from 'react-bootstrap';
import _cloneDeep from 'lodash/cloneDeep';
import _find from 'lodash/find';
import _every from 'lodash/every';
import _zipObject from 'lodash/zipObject';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _mapValues from 'lodash/mapValues';
import _filter from 'lodash/filter';
import apiRoutes from 'app/api/routes';
import validateRequiredFields from 'app/lib/validateRequiredFields';
import { FEST_STATUS } from 'app/config/constants';
import { Button } from 'shared';
import { festivalFields } from '../lib/fields';
import { CreateFestModal, FestivalCategory, FestivalDetailsModal } from '../components';
import selectors from '../selectors';
import actions from '../actions';

const groupFestivals = allFests =>
  _mapValues(FEST_STATUS, status => {
    return _filter(allFests, f => f.status === status);
  });

class Dashboard extends React.Component {
  state = {
    groupedFestivals: {},
    showCreateModal: false,
    fields: festivalFields,
    invalidFields: [],
    requiredFields: ['name', 'startDate', 'endDate'],
    errorText: '',
    showFestModal: false,
    festivalInModal: null,
  };

  componentDidMount() {
    this.props.dispatchFestivalsGet();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.festivalsFetch.pending && nextProps.festivalsFetch.fulfilled) {
      this.props.storeFestivals(nextProps.festivalsFetch.value); // @TODO remove this and use data from repository
      this.setState({ groupedFestivals: groupFestivals(nextProps.festivalsFetch.value) });
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

    if (_every(fields, value => value) && invalidFieldsTemp.length === 0) {
      this.setState({ invalidFields: [] });
      const cleanFields = _zipObject(_map(fields, f => f.name), _map(fields, f => f.value));
      this.props.dispatchCreateFestivalPost({ ...cleanFields, status: 'drafts' });
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

  handleFestivalClick = fest => {
    this.setState({ showFestModal: true, festivalInModal: fest });
  };

  toggleFestDetailsModal = () => {
    this.setState(prevState => ({ showFestModal: !prevState.showFestModal }));
  };

  handleFestDetailsClick = festId => {
    this.props.history.push(`/festival/${festId}`);
  };

  render() {
    const {
      groupedFestivals,
      showCreateModal,
      fields,
      invalidFields,
      requiredFields,
      errorText,
      showFestModal,
      festivalInModal,
    } = this.state;
    const { createFestivalFetch } = this.props;

    return (
      <div>
        <Button primary big onClick={this.toggleCreateModal}>
          Create New Festival
        </Button>

        <Row style={{ margin: 0 }}>
          {_map(groupedFestivals, (list, category) => (
            <FestivalCategory
              key={category}
              categoryTitle={category}
              festivals={list}
              onFestivalClick={this.handleFestivalClick}
            />
          ))}
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

        {festivalInModal && (
          <FestivalDetailsModal
            show={showFestModal}
            onClose={this.toggleFestDetailsModal}
            festival={festivalInModal}
            onDetailsClick={this.handleFestDetailsClick}
          />
        )}
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

export default enhance(withRouter(Dashboard));
