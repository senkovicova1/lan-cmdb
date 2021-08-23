import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'beautiful-react-diagrams/styles.css';
import Navigation from './navigation';

import {
  MainPage
} from '../other/styles/styledComponents';

export const App = () => (
  <MainPage>
    <Navigation />
  </MainPage>
);
