import apiClient from './apiClient';
import DATA_PATH from './config';

export default {
  async getTabsData() {
    try {
      const { data } = await apiClient.get(DATA_PATH);
      return data;
    } catch (error) {
      console.log(error.message); // eslint-disable-line
      return null;
    }
  },
};
