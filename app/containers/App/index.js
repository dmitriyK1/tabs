import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import enhance from '../App/appEnhancers';
import { Tabs } from '../../components';

const App = ({ tabsData, routes, selectedTabIndex }) => (
  <div>
    <Tabs data={tabsData} selectedTabIndex={selectedTabIndex} />
    <Switch>
      {routes}
    </Switch>
  </div>
);

App.propTypes = {
  tabsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      order: PropTypes.number,
      path: PropTypes.string,
    }),
  ),
  routes: PropTypes.arrayOf(PropTypes.node),
  selectedTabIndex: PropTypes.number,
};

App.defaultProps = {
  tabsData: null,
  routes: null,
  selectedTabIndex: 0,
};

App.displayName = 'App';

export default enhance(App);
