import get from 'lodash/get';
import find from 'lodash/find';

export const getRouteComponent = route => get(route, 'props.component');

export const getSelectedTabIndex = (tabsData, pathname) => {
  const pathnameFragments = pathname.split('/').filter(Boolean);

  const lastFragment = pathnameFragments.pop();

  if (!lastFragment) return 0;

  const searchResult = find(tabsData, tabData => tabData.id === lastFragment);

  return get(searchResult, 'order', -1);
};
