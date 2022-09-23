import React from 'react';

import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle ./index.scss
import './index.scss';

// Main component (will eventually use all the others)
class MyMovieApplication extends React.Component {
  render() {
    return (
      <Container className='fluid'>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
// Tells React to render your app in the root DOM element
const container = document.getElementsByClassName('root')[0];
const root = createRoot(container);
// Tells React to render your app in the root DOM element
root.render(<MyMovieApplication />);
