import React from 'react';
import styled from 'styled-components';
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
        <TablesWrapper>
          <SingleTableWrapper>
            <InlineTable>
              <TableHeader>
                <tr>
                  <th>DRAFTS</th>
                </tr>
              </TableHeader>
              <tbody>
                <tr>
                  <td>One Festival</td>
                </tr>
              </tbody>
            </InlineTable>
          </SingleTableWrapper>
          
          <SingleTableWrapper>
            <InlineTable>
              <TableHeader>
                <tr>
                  <th>PLANNED</th>
                </tr>
              </TableHeader>
              <tbody>
                <tr><td>Roadburn Festival</td></tr>
                <tr><td>Desertfest London</td></tr>
              </tbody>
            </InlineTable>
          </SingleTableWrapper>

          <SingleTableWrapper>
            <InlineTable>
              <TableHeader>
                <tr>
                  <th>ONGOING</th>
                </tr>
              </TableHeader>
              <tbody>
                <tr>
                  <td/>
                </tr>
              </tbody>
            </InlineTable>
          </SingleTableWrapper>

          <SingleTableWrapper>
            <InlineTable>
              <TableHeader>
                <tr>
                  <th>FINISHED</th>
                </tr>
              </TableHeader>
              <tbody>
                <tr>
                  <td>Something for the core</td>
                </tr>
              </tbody>
            </InlineTable>
          </SingleTableWrapper>
        </TablesWrapper>
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

const InlineTable = styled(Table)`
  margin: 20px 0;
  display: inline-table;
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
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Dashboard);
