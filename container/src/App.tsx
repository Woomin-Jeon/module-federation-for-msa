import React from 'react';

const RemoteApp = React.lazy(() => import('app1/App'));

const App: React.FC = () => (
  <div>
    <h1>My App!</h1>
    <RemoteApp />
  </div>
);

export default App;
