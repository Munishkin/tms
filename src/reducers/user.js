import { userConstants } from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST: {
            return {
                loggingIn: true
            };
        }
        case userConstants.REGISTER_SUCCESS:
        case userConstants.LOGIN_SUCCESS: 
        case userConstants.UPDATE_USER: {
            return {
                loggedIn: true,
                user: action.user,
            }
        }
        case userConstants.LOGIN_FAILURE: {
            return {
                error: action.error,
            }
        }
        case userConstants.LOGOUT: {
            return {};
        }
        default:
            return state
    }
}