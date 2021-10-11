import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { recordService, userService } from '../../services';
import Title from '../../components/Title';
import AppContainer from '../../components/AppContainer';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Input from '../../components/Input';
import SaveButton from '../../components/Button/saveBtn';
import Select from '../../components/Select';
import Message from '../../components/Message';

export default () => {
    const [projectDescription, setDescription] = useState('');
    const [hours, setHours] = useState('');
    const [date, setDate] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { role } = useSelector(state => state.user.user);

    useEffect(() => {
        let cancellCallToApi = false;
        if (role === 'admin') {
           userService.fetchOnlyUsers()
            .then(users => {
                if (cancellCallToApi) return;

                setUsers(users);
                setUserId(users[0]._id);
            })
            .catch(error => {
                if (cancellCallToApi) return;
            });
        }

        return () => {
            cancellCallToApi = true;
        }
    }, [role]);
    
    const onChangeDescription = e => {
        setDescription(e.target.value);
    }

    const onChangeHours = e => {
        setHours(e.target.value);
    }

    const onChangeDate = e => {
        setDate(e.target.value);
    }

    const onChangeUserId = e => {
        setUserId(e.target.value);
    }

    const addRecord = async e => {
        e.preventDefault();

        await recordService.add({projectDescription, hours, date, userId})
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
            { success && <Message color={'lightseagreen'}>Successfully added a record</Message> }
            { error && <Message>There is an error adding a new record. Please try again later</Message> }
            <form onSubmit={addRecord}>
                <Title>Record</Title>
                <Text>Record description</Text>
                <Input onChange={onChangeDescription} type="text" value={projectDescription} required/>
                <Text>Hours spent</Text>
                <Input onChange={onChangeHours} type="number" min={0.5} step={0.5} value={hours} required/>
                <Text>Date</Text>
                <Input onChange={onChangeDate} type="date" value={date} required/>
                { role === 'admin' && 
                <>
                    <Text>{users.length && 'User' || 'No users available to choose. Please add new users first.'}</Text>
                    <Select onChange={onChangeUserId} value={userId} required>
                        {users.map(user => <option key={user._id} value={user._id}>{user.firstname} {user.lastname}</option>)}
                    </Select>
                </>
                }
                <div>
                    <SaveButton  type="submit">Save</SaveButton>
                </div>
            </form>
        </AppContainer>
    );
};
