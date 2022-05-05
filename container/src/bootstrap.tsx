import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from '@src/App';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);
