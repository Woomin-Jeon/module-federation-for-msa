import React from 'react';
import { countAtom } from '@module-federation/store';
import { useSetRecoilState } from 'recoil';

interface Props {
  containerLocalState: number
  handleContainerLocalState: () =>void
}

const App1: React.FC<Props> = ({ containerLocalState, handleContainerLocalState }) => {
  console.log('app1 rendered');

  const setGlobalCountState = useSetRecoilState(countAtom);

  const handleGlobalCount = () => {
    setGlobalCountState((prev) => prev + 1);
  };

  return (
    <div>
      <button type="button" onClick={handleGlobalCount}>Global State +1</button>
      <br />
      <br />

      <div>{`Container LocalState: ${containerLocalState}`}</div>
      <button type="button" onClick={handleContainerLocalState}>Container LocalState +1</button>
    </div>
  );
};

export default App1;
