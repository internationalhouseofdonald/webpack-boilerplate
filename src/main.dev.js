import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import './styles.scss';
import { App } from './components/App';

const history = createBrowserHistory();


window.React = React;

if (module.hot) {
  module.hot.accept(); // IMPORTANT!!!
  // console.log('Module is hot!');
}

ReactDOM.render((
  <Router history={history} >
    <Switch>
      <Route path="*" render={(routeProps) => <App {...routeProps} />} />
    </Switch>
  </Router>
), document.getElementById('app'));