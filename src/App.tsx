import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import { auth, firebase } from './services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

function App(): JSX.Element {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(loggedUser => {
      if (loggedUser) {
        const { displayName, photoURL, uid } = loggedUser;
        if (!displayName || !photoURL)
          throw new Error('Missing Information from Google Account');
        setUser({ id: uid, name: displayName, avatar: photoURL });
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL)
        throw new Error('Missing Information from Google Account');
      setUser({ id: uid, name: displayName, avatar: photoURL });
    }
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
