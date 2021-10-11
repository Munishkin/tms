import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userConstants } from '../../constants';
import Title from '../../components/Title';
import AppContainer from '../../components/AppContainer';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Input from '../../components/Input';
import SaveButton from '../../components/Button/saveBtn';
import Message from '../../components/Message';
import { userService } from '../../services';

export default () => {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(user.username);
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [hours, setHours] = useState(user.preferredWorkingHoursPerDay || 0);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onChangeFirstname = e => {
        setFirstname(e.target.value);
    }

    const onChangeLastname = e => {
        setLastname(e.target.value);
    }

    const onChangeHours = e => {
        setHours(e.target.value);
    }

    const updateUser = async e => {
        e.preventDefault();
        const updates = { username, firstname, lastname };

        if (hours >= 0) {
            updates.preferredWorkingHoursPerDay = hours;
        }

        await userService.update(user._id, updates)
            .then(({ data }) => {
                setSuccess(true);
                setError(false);
                dispatch({
                    type: userConstants.UPDATE_USER,
                    user: data
                });
            })
            .catch((error) => {
                setError(true);
                setSuccess(false);
            });
    }

    return (
        <AppContainer>
            <Header />
            { success && <Message color={'lightseagreen'}>Successfully update profile</Message> }
            { error && <Message>There is an error updating your profile. You probably trying to change your username to an existing one</Message>}
            <form onSubmit={updateUser}>
                <Title>User details</Title>
                <Text>Username</Text>
                <Input onChange={onChangeUsername} type="text" value={username} required/>
                <Text>First name</Text>
                <Input onChange={onChangeFirstname} type="text" value={firstname} required/>
                <Text>Last name</Text>
                <Input onChange={onChangeLastname} type="text" value={lastname} required/>
                <Text>Role</Text>
                <Input type="text" value={user.role} disabled/>
                { user.role === 'user' && 
                <>
                    <Text>Preferred working hours per day</Text>
                    <Input onChange={onChangeHours} type="number" min={0} step={0.5} value={hours}/>
                </>
                }
                 <div>
                    <SaveButton type="submit">Save</SaveButton>
                </div>
            </form>
        </AppContainer>
    );
};
