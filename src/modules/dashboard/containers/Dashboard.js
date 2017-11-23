import React from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import {Col, Table} from 'react-bootstrap';
import forEach from 'lodash/forEach';
import apiRoutes from '../../../api/routes';
import {CreateNewCard, Label, TableHeader} from '../../../shared';
import selectors from '../selectors';
import actions from '../actions';


class Dashboard extends React.Component {
  state = {
    draftFestivals: [],
    plannedFestivals: [],
    ongoingFestivals: [],
    completedFestivals: [],
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
        default: //drafts
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

    console.log('yo',draftFestivals,
      plannedFestivals,
      ongoingFestivals,
      completedFestivals)
  };

  render(){
    return (
      <div>
        <CreateNewCard>
          <p>Create New Festival</p>
        </CreateNewCard>
        <Table bsClass="table" style={{margin: '20px 0'}}>
          <TableHeader>
            <tr>
              <th>DRAFTS</th>
              <th>PLANNED</th>
              <th>ONGOING</th>
              <th>COMPLETED</th>
            </tr>
          </TableHeader>
          <tbody>
            <tr>
              <td/>
              <td/>
              <td/>
              <td/>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

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
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Dashboard);
