import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App2 from '@src/App2';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <main>
    <h1>Example page for development</h1>
    <RecoilRoot>
      <App2 />
    </RecoilRoot>
  </main>,
);
