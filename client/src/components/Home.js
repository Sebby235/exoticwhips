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
        <div className='page-container'>
            <div className='center-container'>
                <h1 style={{ color: 'white' }}>ExoticWhips</h1>
                <div className='button-group'>
                    <Button variant="primary" onClick={handleShowLogin}>
                        Login
                    </Button>
                    <Button variant="primary" onClick={handleShowRegister}>
                        Signup
                    </Button>
                </div>
            </div>

            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Login />
                </Modal.Body>
            </Modal>

            <Modal show={showRegister} onHide={handleCloseRegister}>
                <Modal.Header closeButton>
                    <Modal.Title>Signup</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Register />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Home