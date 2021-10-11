import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Title from '../../components/Title';
import AppContainer from '../../components/AppContainer';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Message from '../../components/Message';
import SaveButton from '../../components/Button/saveBtn';
import { userService } from '../../services';

export default () => {
    const params = useParams();

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('')
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const currentUserRole = useSelector(state => state.user.user.role);

    useEffect(() => {
        let cancelCallToApi = false;

        userService.getById(params.id)
            .then(user => {
                if (cancelCallToApi) return;

                setUsername(user.username);
                setFirstname(user.firstname);
                setLastname(user.lastname);
                setRole(user.role)
            })
            .catch(error => {
                if (cancelCallToApi) return;
                setError(true);
            });
        
        return () => {
            cancelCallToApi = true;
        }
    }, []);

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

    const updateUser = async e => {
        e.preventDefault();

        await userService.update(params.id, { username, firstname, lastname, role })
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
            { success && <Message color={'lightseagreen'}>Successfully updated user</Message> }
            { error && <Message>There is an error updating a user. You probably trying to change username to an existing one</Message>}
            <form onSubmit={updateUser}>
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
                <div>
                    <SaveButton type="submit">Save</SaveButton>
                </div>
            </form>
        </AppContainer>
    );
};
