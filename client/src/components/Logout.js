import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from './UserContext'
import { HistoryOutlined } from '@mui/icons-material';
import {Button} from './Button'


const Logout = () => {
    const history = useHistory();
    const {setUser} = useContext(UserContext);

    const handleLogout = async () => {
        setUser(null)

        localStorage.removeItem('userToken')
        history.push('/login')
    }
    return (
        <Button
        onClick={handleLogout}
        className='btns'
        buttonStyle='btn--outline'
        buttonSize='btn-large'
        >
            Logout
        </Button>
    )
}

export default Logout