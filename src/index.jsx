import React from 'react';

import Container from 'react-bootstrap/Container';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';
import MainView  from './components/main-view/main-view';

// Import statement to indicate that you need to bundle ./index.scss
import './index.scss';

// Main component (will eventually use all the others) - contains the main view
const store = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class MyMovieApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Container style={{background: '#060d17 '}} fluid >
        <MainView />
      </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
// Tells React to render your app in the root DOM element
const container = document.getElementsByClassName('root')[0];
const root = createRoot(container);
// Tells React to render your app in the root DOM element
root.render(<MyMovieApplication />);
