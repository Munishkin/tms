import { userConstants } from "../constants";
import { userService } from '../services';
import history from '../routing/history';
import clearCookies from "../utils/clearCookies";

export const userActions = {
    login,
    register,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch({
            type: userConstants.LOGIN_REQUEST
        });

        userService.login(username, password)
            .then(user => {
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    user
                });
                history.push('/');
            })
            .catch(error => {
                dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    error
                });
                history.push('/login')
            });
    };
}

function logout() {
    return async dispatch => {
        dispatch({
            type: userConstants.LOGOUT
        });
        clearCookies();
    };
}

function register(user) {
    return dispatch => {
        dispatch({
            type: userConstants.REGISTER_REQUEST
        });
        
        userService.register(user)
            .then(user => {
                dispatch({
                    type: userConstants.REGISTER_SUCCESS,
                    user
                });

                history.push('/login');
            })
            .catch(error => {
                dispatch({
                    type: userConstants.REGISTER_FAILURE,
                    error
                });
            });
    };
}
