import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import theme from './assets/theme';

import App from './App';
import rootReducer from './reducers';

// Polyfils
import 'isomorphic-fetch';
import 'es6-promise/auto';

injectTapEventPlugin();

const store = createStore(rootReducer, {}, compose(
  // Add other middleware on this line...
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
  )
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
