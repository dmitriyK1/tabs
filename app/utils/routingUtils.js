import React, { Children } from 'react';
import {
  flow,
  map as mapFp,
  sortBy as sortByFp,
} from 'lodash/fp';
import { Route, Link } from 'react-router-dom';
import loadable from 'loadable-components';
import { getRouteComponent } from '../selectors';

const addDefaultRoute = (routes) => {
  const FirstRoute = routes[0];

  return Children.toArray([
    FirstRoute && <Route exact path="/" component={getRouteComponent(FirstRoute)} />,
    ...routes,
  ].filter(Boolean));
};

const addNotFoundRoute = routes => (
  Children.toArray(
    [
      ...routes,
      <Route
        component={loadable(() => import('../components/Page404.js'))}
      />,
    ],
  )
);

export const mapTabDataToRoutes = tabsData => flow( // eslint-disable-line
  sortByFp('order'),
  mapFp(tabData => (
    <Route
      key={tabData.id}
      path={`/${tabData.id}`}
      component={loadable(() => import(`../components/${tabData.path}`))}
    />
  )),
  addDefaultRoute,
  addNotFoundRoute,
)(tabsData);

export const mapDataToTabs = Tab => data => (
  flow(
    sortByFp('order'),
    mapFp(
      tabData => (
        <Tab key={tabData.id}>
          <Link to={`/${tabData.id}`}>{tabData.title}</Link>
        </Tab>
      ),
    ),
  )(data)
);
