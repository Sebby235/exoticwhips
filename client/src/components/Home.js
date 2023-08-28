import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import NavBar from './NavBar'
import '../Home.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Home() {

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const handleCloseLogin = () => setShowLogin(false)
    const handleShowLogin = () => setShowLogin(true)

    const handleCloseRegister = () => setShowRegister(false)
    const handleShowRegister = () => setShowRegister(true)

    return (
        <div className='banner'>
            <div className='content'>
                <h1>ExoticWhips</h1>
                <p>Where Luxury Meets Exotic</p>
                </div>
            </div>
    )
}

export default Home
