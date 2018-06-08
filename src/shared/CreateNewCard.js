import styled from 'styled-components';

//@TODO: make this a button
const CreateNewCard = styled.div`
  background-color: #9d5c63;
  border: 3px solid #83474e;
  border-radius: 1px;
  color: #f4f7fc;
  height: 50px;
  width: 200px;
  padding: 5px;
  margin: 10px 0;
  text-align: center;
  font-size: 1.3em;

  :hover {
    background-color: #83474e;
    color: #f4f7fc;
    cursor: pointer;
  }

  p {
    padding: 5px;
  }
`;

export default CreateNewCard;
