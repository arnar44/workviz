import React, { Fragment } from 'react';
import './App.scss';
import FIREBASE_INITIALIZE from './Config.js'


function App() {
  FIREBASE_INITIALIZE();
  
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <p>
            Hello
          </p>

        </header>
      </div>
    </Fragment>
  );
}

export default App;
