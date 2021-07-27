import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NewRoom from './pages/NewRoom';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
