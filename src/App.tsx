import AutoComplete from './components/AutoComplete';
import { findMatchedUsers, findMatchedMbtis } from './components/findMatched';
import { UserDataType, Mbti } from './components/type';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <AutoComplete<UserDataType>
        getLabel={item => `${item.name}  [ ${item.email} ]`}
        api={findMatchedUsers}
      />
      <AutoComplete<Mbti>
        getLabel={item => `${item.name}  [ ${item.mbti} ]`}
        api={findMatchedMbtis}
      />
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`;
