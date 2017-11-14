import get from 'lodash/get';
import find from 'lodash/find';

export const getRouteComponent = route => get(route, 'props.component');

export const getSelectedTabIndex = (tabsData, pathname) => {
  const searchResult = find(tabsData, tabData => pathname.includes(tabData.id));

  return get(searchResult, 'order');
};
