import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App1 from '@src/App1';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <main>
    <h1>Example page for development</h1>
    <RecoilRoot>
      <App1 />
    </RecoilRoot>
  </main>,
);
