import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { recordService } from '../../services';
import formatDate from '../../utils/formatDate';
import Title from '../../components/Title';
import AppContainer from '../../components/AppContainer';
import Header from '../../components/Header';
import Text from '../../components/Text';
import Input from '../../components/Input';
import SaveButton from '../../components/Button/saveBtn';
import Message from '../../components/Message';

export default () => {
    const params = useParams();

    const [projectDescription, setDescription] = useState('');
    const [hours, setHours] = useState(0);
    const [date, setDate] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        let cancelCallToApi = false;

        recordService.getById(params.id)
            .then(record => {
                if (cancelCallToApi) return;

                setDescription(record.projectDescription);
                setHours(record.hours);
                setDate(formatDate(record.date));
                setUserId(record.userId);
            })
            .catch(error => {
                if (cancelCallToApi) return;
            });
        
        return () => {
            cancelCallToApi = true;
        }
    }, []);

    const onChangeDescription = e => {
        setDescription(e.target.value);
    }

    const onChangeHours = e => {
        setHours(e.target.value);
    }

    const onChangeDate = e => {
        setDate(e.target.value);
    }

    const updateRecord = async e => {
        e.preventDefault();

        await recordService.update(params.id, {projectDescription, hours, date, userId})
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
            { success && <Message color={'lightseagreen'}>Successfully update profile</Message> }
            { error && <Message>There is an error updating your profile. You probably trying to change your username to an existing one</Message>}
            <form onSubmit={updateRecord}>
                <Title>Record</Title>
                <Text>Record description</Text>
                <Input onChange={onChangeDescription} type="text" value={projectDescription} required/>
                <Text>Hours spent</Text>
                <Input onChange={onChangeHours} type="text" value={hours} required/>
                <Text>Date</Text>
                <Input onChange={onChangeDate} type="date" value={date} required/>
                <div>
                    <SaveButton  type="submit">Save</SaveButton>
                </div>
            </form>
        </AppContainer>
    );
};
