import {
  compose,
  lifecycle,
  withStateHandlers,
  withProps,
  branch,
} from 'recompose';
import api from '../../api';
import { mapTabDataToRoutes } from '../../utils/routingUtils';
import { Preloader } from '../../components';
import { getSelectedTabIndex } from '../../selectors';

export default compose(
  withStateHandlers(
    ({ tabsData = null }) => ({ tabsData }),
    {
      setTabsData: () => tabsData => ({ tabsData }),
    }),
  lifecycle({
    componentDidMount() {
      setTimeout(async () => {
        this.props.setTabsData(await api.getTabsData());
      }, 1500);
    },
  }),
  withProps(({ tabsData, location: { pathname } }) => ({
    routes: mapTabDataToRoutes(tabsData),
    selectedTabIndex: getSelectedTabIndex(tabsData, pathname),
  })),
  branch(
    props => !props.tabsData,
    () => Preloader,
  ),
);
