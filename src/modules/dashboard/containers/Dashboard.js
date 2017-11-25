import React from 'react';
import styled from 'styled-components';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import reduxFetch from 'react-redux-fetch';
import {Table, Modal} from 'react-bootstrap';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import apiRoutes from '../../../api/routes';
import {CreateNewCard, Label, TableHeader, Button} from '../../../shared';
import selectors from '../selectors';
import actions from '../actions';


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

    console.log('festival lists created!',draftFestivals,
      plannedFestivals,
      ongoingFestivals,
      completedFestivals)
  };

  handleCreateNewFest = () => {
    this.setState({
      showCreateModal: true
    });
  };

  closeCreateModal = () => {
    this.setState({
      showCreateModal: false
    })
  }

  render(){
    const {draftFestivals, plannedFestivals, ongoingFestivals, completedFestivals } = this.state;
    return (
      <div>
        <CreateNewCard onClick={this.handleCreateNewFest}>
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
              {map(draftFestivals, dFest => <tr key={dFest._id}>
                <td>{dFest.name}</td>
                </tr>)}
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
              {map(plannedFestivals, pFest => <tr key={pFest._id}>
                <td>{pFest.name}</td>
                </tr>)}
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
              {map(ongoingFestivals, oFest => <tr key={oFest._id}>
                <td>{oFest.name}</td>
                </tr>)}
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
              {map(completedFestivals, cFest => <tr key={cFest._id}>
                <td>{cFest.name}</td>
                </tr>)}
              </tbody>
            </InlineTable>
          </SingleTableWrapper>
        </TablesWrapper>

         <Modal show={this.state.showCreateModal} onHide={this.closeCreateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Festival</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeCreateModal} style={{marginRight: 20}}>Close</Button>
            <Button primary>Create Festival</Button>
          </Modal.Footer>
        </Modal>
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
