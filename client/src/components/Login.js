import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext'
import { useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            setMessage(response.data.message);
            setUser({ email });
            setEmail('')
            setPassword('')
            if (response.data.message === 'Login successful') {
                history.push('/')
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Login