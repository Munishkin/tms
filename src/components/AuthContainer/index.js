import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ({ children }) => {
    const isLoggedIn = useSelector(state => !!state.user.user);
    if (isLoggedIn) {
        return children;
    }

    return <Redirect to='/login' />;
}
