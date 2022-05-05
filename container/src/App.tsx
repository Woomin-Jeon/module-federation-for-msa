import React from 'react';

const RemoteApp1 = React.lazy(() => import('app1/App'));
const RemoteApp2 = React.lazy(() => import('app2/App'));

const App: React.FC = () => (
  <div>
    <h1>My App!</h1>
    <RemoteApp1 />
    <RemoteApp2 />
  </div>
);

export default App;
