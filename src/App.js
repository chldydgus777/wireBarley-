import Exchange from 'components/ExchangeCalculation';
import styled from 'styled-components';

function App() {
  return (
    <div>
      <Box>
        <Exchange/>
      </Box>
    </div>
  );
}

const  Box = styled.div`
margin: 1rem;
align-items: center;
display: flex;
`;

export default App;
