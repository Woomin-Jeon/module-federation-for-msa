import styled from '@emotion/styled';
import React, { Suspense, useState } from 'react';
import { countAtom } from '@module-federation/store';
import { useRecoilState } from 'recoil';

const RemoteApp1 = React.lazy(() => import('app1/App1'));
const RemoteApp2 = React.lazy(() => import('app2/App2'));

const App: React.FC = () => {
  console.log('container rendered');

  const [localState, setLocalState] = useState(0);
  const [globalCountState, setGlobalCountState] = useRecoilState(countAtom);

  const handleLocalState = () => {
    setLocalState((prev) => prev + 1);
  };

  const handleGlobalState = () => {
    setGlobalCountState((prev) => prev + 1);
  };

  return (
    <div>
      <h1>App - Container</h1>
      <Flex>
        <StateSection>
          <h3>{`Global State: ${globalCountState}`}</h3>
          <button type="button" onClick={handleGlobalState}>+1</button>
        </StateSection>
        <StateSection>
          <h3>{`Container LocalState: ${localState}`}</h3>
          <button type="button" onClick={handleLocalState}>+1</button>
        </StateSection>
      </Flex>

      <Suspense fallback={<div>Loading...</div>}>
        <Flex>
          <RemoteAppSection>
            <h2>Remote App 1</h2>
            <RemoteApp1
              containerLocalState={localState}
              handleContainerLocalState={handleLocalState}
            />
          </RemoteAppSection>

          <RemoteAppSection>
            <h2>Remote App 2</h2>
            <RemoteApp2
              containerLocalState={localState}
              handleContainerLocalState={handleLocalState}
            />
          </RemoteAppSection>
        </Flex>
      </Suspense>
    </div>
  );
};

const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const RemoteAppSection = styled.div`
  padding: 16px;
  border: 1px solid black;
  border-radius: 8px;
  margin: 16px;
  width: 400px;
  height: 800px;
`;
const StateSection = styled.section`
  padding: 16px;
  margin: 16px;
  border: 1px solid lightgray;
  border-radius: 4px;
  width: max-content;
`;

export default App;
