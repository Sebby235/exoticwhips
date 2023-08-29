import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import { useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import '../Login.css'


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (typeof email !== 'string') return 'Email must be a string';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return 'Email must be in a valid format';
    return ''
  }

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password)

    if (emailError) {
      setMessage(emailError)
      return;
    }

    if (passwordError) {
      setMessage(passwordError)
      return;
    }

    try {
      const response = await axios.post('/login', { email, password });
      setMessage(response.data.message);
      setUser({ email });
      setEmail('');
      setPassword('');
      if (response.data.message === 'Logged in successfully!') {
        history.push('/');
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Grid className='banner' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' style={{ color: 'white' }} textAlign='center'>
          Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid icon='user' iconPosition='left' placeholder='E-mail address'
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              fluid icon='lock' iconPosition='left' placeholder='Password'
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <Button color='black' fluid size='large' type="submit">
              Login
            </Button>
          </Segment>
        </Form>
        {message && <Message>{message}</Message>}
        <Message>
          New to us? <Link to='/register'>Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
