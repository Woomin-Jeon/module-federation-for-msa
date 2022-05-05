import React from 'react';
import { useRecoilValue } from 'recoil';
import { countAtom } from '@module-federation/store';

interface Props {
  containerLocalState: number
  handleContainerLocalState: () =>void
}

const App2: React.FC<Props> = ({ containerLocalState, handleContainerLocalState }) => {
  console.log('app2 rendered');
  const globalCountState = useRecoilValue(countAtom);

  return (
    <div>
      <div>{`Global State: ${globalCountState}`}</div>
      <br />
      <div>{`Container LocalState: ${containerLocalState}`}</div>
      <button type="button" onClick={handleContainerLocalState}>Container LocalState +1</button>
    </div>
  );
};
export default App2;
