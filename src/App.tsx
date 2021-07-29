import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
