import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import App from './App';

class Root extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Root;
