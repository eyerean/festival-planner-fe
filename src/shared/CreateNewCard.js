import styled from 'styled-components';

const CreateNewCard = styled.div`
  background-color: #993333;
  border: 3px solid #900000;
  border-radius: 10px;
  color: whitesmoke;
  height: 50px;
  width: 200px;
  padding: 5px;
  margin: 10px 0;
  text-align: center;
  font-size: 1.3em;

  :hover {
    background-color: #900000;
    color: whitesmoke;
    cursor: pointer;
  }

  p {
    padding: 5px;
  }
`;

export default CreateNewCard;