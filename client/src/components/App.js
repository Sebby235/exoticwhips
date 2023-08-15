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
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/cars'>
            <Car cars={cars} />
          </Route>
          <Route path='/orders'>
            <Order />
          </Route>
          <Route path='/reviews'>
            <Review />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  )
}

export default App;
