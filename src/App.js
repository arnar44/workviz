import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Home from './routes/home/Home';

function App(props) {
  const { location } = props
  
  return (
    <Fragment>
        <Helmet defaultTitle='WorkViz' titleTemplate='%s - WorkViz'></Helmet>
        <main className='App'>
          <Switch location={location}>
            <Route exact path='/' component={Home} />
          </Switch>
        </main>
    </Fragment>
  );
}

export default App;
