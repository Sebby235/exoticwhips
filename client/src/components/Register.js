import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const validateName = (name) => {
        if (!name) return 'Name is required';
        if (name.length <= 5) return 'Name must be 5 or more characters long'
        return ''
    }

    const validateEmail = (email) => {
        if (!email) return 'Email is required';
        if (typeof email !== 'string') return 'Email must be a string';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return 'Email must be in a valid format';
        return ''
    }

    const validatePassword = (password) => {
        if (!password) return 'Password is required';
        if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password))
            return 'Password must include at least one letter and one number';
        return ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('called')

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password)
        const nameError = validateName(name)


        if (emailError) {
            setMessage(emailError)
            return;
        }

        if (passwordError) {
            setMessage(passwordError)
            return;
          }

        if (nameError) {
            setMessage(nameError)
            return;
        }
        console.log('before post')
        try {
            const response = await axios.post('http://localhost:5555/register', {
                email,
                password,
                name,
            });
            console.log('afterpost', response)
            setMessage(response.data.message);
            setEmail('');
            setPassword('');
            setName('');
        } catch (error) {
          console.log("Error in axios.post call", error);  // Debugging line
          if (error.response && error.response.data && error.response.data.message) {
              setMessage(error.response.data.message);
          } else {
              setMessage("An unexpected error occurred");
          }
      }
    }
    return (
        <Grid className='banner' textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' style={{ color: 'white' }} textAlign='center'>
          Sign Up
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Input
              fluid
              icon='mail'
              iconPosition='left'
              placeholder='E-mail address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button color='black' fluid size='large'>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to='/login'>Login</Link>
        </Message>
        {message && <p>{message}</p>}
      </Grid.Column>
    </Grid>
    );

}

export default Register;
