import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './assets/scss/main.scss';
import App from './containers/Root';

const ROOT_NODE = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    ROOT_NODE,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const newApp = require('./containers/Root').default;
    render(newApp);
  });
}
