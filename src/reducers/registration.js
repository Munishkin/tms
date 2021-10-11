import { userConstants } from '../constants';

export default (state = {}, action) => {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST: {
            return {
                registering: true
            };
        }
        case userConstants.REGISTER_SUCCESS: {
            return {
                registered: true,
            }
        }
        case userConstants.REGISTER_FAILURE: {
            return {
                error: action.error,
            }
        }
        default:
            return state
    }
}