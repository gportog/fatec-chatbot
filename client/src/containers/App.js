import React, { Component } from 'react';
import ChatbotDash from './ChatbotDash';
import {
  HashRouter,
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/chatbot" component={ChatbotDash} />
          <Route path="/" component={ChatbotDash} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
