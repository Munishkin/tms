import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Wrapper from '../../components/Wrapper';
import Form from '../../components/Form';
import Title from '../../components/Title';
import Error from '../../components/Message';
import Loading from '../../components/Loading';
import { userActions } from '../../actions';

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const error = useSelector(state => state.registration.error);

    const dispatch = useDispatch();

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onChangeFirstname = e => {
        setFirstname(e.target.value);
    }

    const onChangeLastname = e => {
        setLastname(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }
    
    const onChangeRepeatedPassword = e => {
        setRepeatedPassword(e.target.value)
    }
    
    const handleRegister = e => {
        e.preventDefault();
        if (password !== repeatedPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
            dispatch(userActions.register({
                username,
                firstname,
                lastname,
                password
            }));
            setUsername("");
            setFirstname("");
            setLastname("");
            setPassword("");
            setRepeatedPassword("");
        }
    }

    return (
        <Wrapper>
            {registering && <Loading />}
            <Form onSubmit={handleRegister}>
                {error && <Error>Please use a different username to register</Error>}
                {passwordError && <Error>Password values should match</Error>}
                <Title>Register</Title>
                <Input value={username} onChange={onChangeUsername} type="text" name="username" placeholder="username" required/>
                <Input value={firstname} onChange={onChangeFirstname} type="text" name="firstname" placeholder="first name" required/>
                <Input value={lastname} onChange={onChangeLastname} type="text" name="lastname" placeholder="last name" required/>
                <Input value={password} onChange={onChangePassword} type="password" name="password" placeholder="password" required/>
                <Input value={repeatedPassword} onChange={onChangeRepeatedPassword} type="password" name="repeatedPassword" placeholder="confirm your password" required/>
                <Button type="submit">Register</Button>
            </Form>
        </Wrapper>
    )
}

export default RegisterForm;
