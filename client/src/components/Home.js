import React, { useState } from 'react'
import '../Home.css'
import {Button} from './Button'

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
                <Button
                className='btns'
                buttonStyle='btn--outline'
                buttonSize='btn-large'
                >
                    Get Started
                </Button>
                </div>
            </div>
    )
}

export default Home
