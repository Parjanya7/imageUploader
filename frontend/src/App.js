import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ImageUpload from './Components/ImageUpload';
import Dashboard from './Components/Dashboard';

function App() {

  const [ user, setUser ] = useState('');

  const updateUser = (user) => setUser(user);

  return (
    <div >
      <Router>
        <Switch>
          <Route exact path = '/' component = { () => <Login user = { user } updateUser = { updateUser } /> }/>
          <Route exact path = '/imageUpload' component = { () => <ImageUpload user = { user } updateUser = { updateUser } /> }/>
          <Route exact path = '/dashboard' component = { () => <Dashboard user = { user } updateUser = { updateUser } /> }/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
