import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { UserProvider } from './UserContext';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import NavBar from './NavBar';
import About from './About';
import Car from './Car';
import Order from './Order';
import Review from './Review';
import '../Home.css';
import '../App.css'

import ProtectedRoute from './ProtectedRoute';

function Content() {
  const [cars, setCars] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:5555/cars')
      .then(r => r.json())
      .then(allCars => setCars(allCars));
  }, []);

  return (
    <UserProvider>
      {!(location.pathname === '/login' || location.pathname === '/register') && <NavBar />}
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <ProtectedRoute path='/about' component={About} />
        <ProtectedRoute path='/cars' component={() => <Car cars={cars} />} />
        <ProtectedRoute path='/orders' component={Order} />
        <ProtectedRoute path='/reviews' component={Review} />
        <ProtectedRoute path='/' component={Home} />
      </Switch>
    </UserProvider>
  );
}

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;
