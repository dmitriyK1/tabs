import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'react-tabs/style/react-tabs.scss';
import App from '../App';

const Root = () => {
  return (
    <Router>
      <Route component={App} />
    </Router>
  );
};

Root.displayName = 'Root';

export default Root;
