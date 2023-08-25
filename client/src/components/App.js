import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from './UserContext'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import NavBar from './NavBar'
import About from './About'
import Car from './Car'
import Order from './Order'
import Review from './Review'
import '../Home.css'
import ProtectedRoute from './ProtectedRoute';

const backgroundStyle = {
  background: "url('https://wallpapercave.com/wp/wp7034680.jpg') no-repeat center center fixed",
  WebkitBackgroundSize: "cover",
  MozBackgroundSize: "cover",
  OBackgroundSize: "cover",
  backgroundSize: "cover",
  margin: 0,
  padding: 0,
};



function App() {

  const [cars, setCars] = useState([])

  useEffect(() => {
      fetch('http://localhost:5555/cars')
          .then(r => r.json())
          .then(allCars => setCars(allCars))
  }, [])
  return (
    <Router>
      <UserProvider>
        <NavBar />
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
    </Router>
  )
}

export default App;
