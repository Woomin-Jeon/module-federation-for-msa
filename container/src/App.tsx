import styled from '@emotion/styled';
import React, { useState } from 'react';

const RemoteApp1 = React.lazy(() => import('app1/App'));
const RemoteApp2 = React.lazy(() => import('app2/App'));

const App: React.FC = () => {
  const [localState, setLocalState] = useState(0);

  const handleLocalState = () => {
    setLocalState((prev) => prev + 1);
  };

  return (
    <div>
      <h1>App - Container</h1>
      <h3>{`Container LocalState: ${localState}`}</h3>
      <button type="button" onClick={handleLocalState}>+1</button>

      <RemoteAppsLayout>
        <Section>
          <h2>Remote App 1</h2>
          <RemoteApp1
            containerLocalState={localState}
            handleContainerLocalState={handleLocalState}
          />
        </Section>

        <Section>
          <h2>Remote App 2</h2>
          <RemoteApp2
            containerLocalState={localState}
            handleContainerLocalState={handleLocalState}
          />
        </Section>
      </RemoteAppsLayout>
    </div>
  );
};

const RemoteAppsLayout = styled.div`
  display: flex;
  align-items: center;
`;
const Section = styled.div`
  padding: 16px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 16px;
  width: 400px;
  height: 800px;
`;

export default App;
