import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Title from '../../components/Title';
import AppContainer from '../../components/AppContainer';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Input from '../../components/Input';
import SaveButton from '../../components/Button/saveBtn';
import Select from '../../components/Select';
import Message from '../../components/Message';
import { userService } from '../../services';

export default () => {
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const currentUserRole = useSelector(state => state.user.user.role);

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onChangeFirstname = e => {
        setFirstname(e.target.value);
    }

    const onChangeLastname = e => {
        setLastname(e.target.value);
    }

    const onChangeRole = e => {
        setRole(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const addUser = async e => {
        e.preventDefault();

        await userService.add({ username, firstname, lastname, role, password })
            .then(() => {
                setSuccess(true);
                setError(false);
            })
            .catch((error) => {
                setError(true);
                setSuccess(false);
            });
    }

    return (
        <AppContainer>
            <Header />
            { success && <Message color={'lightseagreen'}>Successfully added user</Message> }
            { error && <Message>There is an error adding a new user. You probably trying to add an existing username</Message> }
            <form onSubmit={addUser}>
                <Title>User details</Title>
                <Text>Username</Text>
                <Input onChange={onChangeUsername} type="text" value={username} required/>
                <Text>First name</Text>
                <Input onChange={onChangeFirstname} type="text" value={firstname} required/>
                <Text>Last name</Text>
                <Input onChange={onChangeLastname} type="text" value={lastname} required/>
                <Text>Role</Text>
                <Select onChange={onChangeRole} name="role" value={role}>
                    <option value="user">user</option>
                    <option value="manager">manager</option>
                    {currentUserRole === 'admin' && <option value="admin">admin</option> }
                </Select>
                <Text>Password</Text>
                <Input onChange={onChangePassword} type="password" value={password} required/>
                <div>
                    <SaveButton type="submit">Save</SaveButton>
                </div>
            </form>
        </AppContainer>
    );
};
