import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Wrapper from '../../components/Wrapper';
import Form from '../../components/Form';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Link from '../../components/Link';
import Loading from '../../components/Loading';
import Error from '../../components/Message';
import { userActions } from '../../actions';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const location = useLocation();
    const loggingIn = useSelector(state => state.user.loggingIn);
    const loggedIn = useSelector(state => state.user.loggedIn);
    const error = useSelector(state => state.user.error);
    const onChangeUsername = e => {
        setUsername(e.target.value);
    };

    const onChangePassword = e => {
        setPassword(e.target.value);
    };

    const handleLogin = e => {
        e.preventDefault();
        dispatch(userActions.login(username, password));
        setUsername('');
        setPassword('');
    }

    if (loggedIn) {
        return  <Redirect to={{ pathname: '/' }} />
    }
    
    return (
        <Wrapper>
            {loggingIn && <Loading />}
            <Form onSubmit={handleLogin}>
                {error && <Error>Please enter correct username and password</Error>}
                <Title>Sign in</Title>
                <Input value={username} onChange={onChangeUsername} type="text" name="username" placeholder="username" required/>
                <Input value={password} onChange={onChangePassword} type="password" name="password" placeholder="password" required/>
                <Button type="submit">Sign in</Button>
                <Text>Need an account?</Text>
                <Link to="/register"><Button>Register</Button></Link>
            </Form>
        </Wrapper>
    )
}

export default LoginForm;
