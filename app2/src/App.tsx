import React from 'react';

interface Props {
  containerLocalState: number
  handleContainerLocalState: () =>void
}

const App: React.FC<Props> = ({ containerLocalState, handleContainerLocalState }) => (
  <div>
    <div>{`Container LocalState: ${containerLocalState}`}</div>
    <button type="button" onClick={handleContainerLocalState}>Container LocalState +1</button>
  </div>
);

export default App;
