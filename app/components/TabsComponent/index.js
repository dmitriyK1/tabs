import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { withProps } from 'recompose';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { mapDataToTabs } from '../../utils/routingUtils';

const TabsComponent = ({ data, tabs, selectedTabIndex }) => (
  <Tabs defaultIndex={selectedTabIndex}>
    <TabList>{tabs}</TabList>

    {map(data, tabData => <TabPanel key={tabData.id} />)}
  </Tabs>
);

TabsComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      order: PropTypes.number,
      path: PropTypes.string,
    }),
  ),
  tabs: PropTypes.arrayOf(PropTypes.node),
  selectedTabIndex: PropTypes.number,
};

TabsComponent.defaultProps = {
  data: null,
  tabs: null,
  selectedTabIndex: 0,
};

TabsComponent.displayName = 'Tabs';

const enhance = withProps(
  ({ data }) => ({
    tabs: mapDataToTabs(Tab)(data),
  }),
);

export default enhance(TabsComponent);
