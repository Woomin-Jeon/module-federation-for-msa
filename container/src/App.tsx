import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

import Content from '@src/components/Content';
import { RemoteApp1, RemoteApp2 } from '@src/components/RemotePages';
import styled from '@emotion/styled';

const App: React.FC = () => {
  console.log('container rendered');

  return (
    <div>
      <h1>App - Container</h1>

      <BrowserRouter>
        <Nav>
          <Link to="/">container</Link>
          <Link to="/app1">app1</Link>
          <Link to="/app2">app2</Link>
        </Nav>

        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/app1" element={<RemoteApp1 />} />
          <Route path="/app2" element={<RemoteApp2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const Nav = styled.div`
  display: flex;
  padding: 16px;
  
  & > a {
    display: block;
    margin-right: 10px;
  }
`;

export default App;
