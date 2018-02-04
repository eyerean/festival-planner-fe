import React from 'react';
import styled from 'styled-components';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import { reduxForm } from 'redux-form';
import forEach from 'lodash/forEach';
import apiRoutes from '../../../api/routes';
import {CreateNewCard } from '../../../shared';
import selectors from '../selectors';
import actions from '../actions';
import FestivalTable from '../components/FestivalTable';
import CreateFestModal from '../components/CreateFestModal';

class Dashboard extends React.Component {
  state = {
    draftFestivals: [],
    plannedFestivals: [],
    ongoingFestivals: [],
    completedFestivals: [],
    showCreateModal: false,
  };

  componentDidMount(){
    this.props.dispatchFestivalsGet();
  };

  componentWillReceiveProps(nextProps, nextState) {
    if(this.props.festivalsFetch.pending && nextProps.festivalsFetch.fulfilled){
      this.props.storeFestivals(nextProps.festivalsFetch.value);
      this.categorizeFestivals(nextProps.festivalsFetch.value);
    }
  };

  categorizeFestivals = (allFestivals) => {
    let draftFestivals = [];
    let plannedFestivals = [];
    let ongoingFestivals = [];
    let completedFestivals = [];

    forEach(allFestivals, fest => {
      switch (fest.status){
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
      completedFestivals
    });

    console.log('festival lists created!',draftFestivals,
      plannedFestivals,
      ongoingFestivals,
      completedFestivals)
  };

  toggleCreateModal = () => {
    this.setState(prevState => ({
      showCreateModal: !prevState.showCreateModal
    }))
  };

  handleSubmitNewFestival = (formData) => {
    console.log('no way!', formData);
  };

  render(){
    const {handleSubmit, error, submitting} = this.props;
    const {draftFestivals, plannedFestivals, ongoingFestivals, completedFestivals, showCreateModal } = this.state;

    return (
      <div>
        <CreateNewCard onClick={this.toggleCreateModal}>
          <p>Create New Festival</p>
        </CreateNewCard>

        <TablesWrapper>
          <SingleTableWrapper>
            <FestivalTable title="drafts" festivals={draftFestivals} />
          </SingleTableWrapper>
          
          <SingleTableWrapper>
            <FestivalTable title="planned" festivals={plannedFestivals} />
          </SingleTableWrapper>

          <SingleTableWrapper>
            <FestivalTable title="ongoing" festivals={ongoingFestivals} />
          </SingleTableWrapper>

          <SingleTableWrapper>
            <FestivalTable title="finished" festivals={completedFestivals} />
          </SingleTableWrapper>
        </TablesWrapper>

        <CreateFestModal 
          show={showCreateModal}
          onClose={this.toggleCreateModal}
          onSubmit={handleSubmit(this.handleSubmitNewFestival)}
          error={error}
          submitting={submitting}
        />
      </div>
    );
  }
};

const TablesWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SingleTableWrapper = styled.div`
  flex: 1;
`;

const mapStateToProps = (state) => ({
  festivals: selectors.getFestivals(state)
});

const mapDispatchToProps = (dispatch) => ({
  storeFestivals: bindActionCreators(actions.storeFestivals, dispatch)
});

const mapPropsToDispatchToProps = (props) => [
  {
    resource: 'festivals',
    method: 'GET',
    request: () => ({
      url: apiRoutes().festivals()
    })
  }
];

const enhance = compose(
  reduxFetch(mapPropsToDispatchToProps),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'createFestForm',
    touchOnChange: true,
    touchOnBlur: true
  })
);

export default enhance(Dashboard);
