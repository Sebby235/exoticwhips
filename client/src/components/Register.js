import React, {useState} from 'react';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/register', {
                email, 
                password,
                name,
            });
            setMessage(response.data.message);
            setEmail('');
            setPassword('');
            setName('');
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }
    return (
        <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
    </div>   
  );
    
}

export default Register;