import userModel from '../models/user';
import { isActionAllowed, findPriviligedUsersAboveCurrentRole } from '../utils';
import { ACTIONS } from '../constants';

class UserService {
    constructor(model) {
        this.model = model;
    }

    getAll(user, fetchOnlyUsers, limit = 0, offset = 0) {
        if (isActionAllowed(ACTIONS.CRUD_USERS, user.role)) {
            let query = {};

            if (fetchOnlyUsers) {
                query.role = { $eq: 'user' };
            } else {
                query = { 
                    role: { $nin: findPriviligedUsersAboveCurrentRole(user.role) },
                    _id: { $ne: user._id }
                }
            }

            return this.model
                .find(query)
                .select(['_id', 'username', 'firstname', 'lastname', 'role', 'preferredWorkingHoursPerDay'])
                .sort({ firstname: 1})
                .limit(limit)
                .skip(offset);
        }

        return Promise.reject({ status: 403, message: 'You do not have permission to access this endpoint.' });
    }

    // this method is used only internally therefore there is no need to check for authorization
    getByUsername (username) {
        return this.model.findOne({ username });
    }

    async getById(id, user) {
        if (isActionAllowed(ACTIONS.CRUD_USERS, user.role) || id === user._id) {
            const fetchedUser = await this.model.findById(id);

            return this._transformData(fetchedUser);
        }
        
        return Promise.reject({ status: 403, message: 'You do not have permission to access this endpoint.' });
    }

    async add(data, user) {
        // if there is no user and role is not manager or admin then allow registration
        // if there is a user then allow adding users only to admins and managers
        if ((!user && (!data.role || data.role === 'user')) || user && isActionAllowed(ACTIONS.CRUD_USERS, user.role)) {
            if (user) {
                this._canUserAddPreferredWorkingHoursPerDay(data.preferredWorkingHoursPerDay, user.role);
            }

            const newUser = await this.model(data).save();
            return this._transformData(newUser);
        }

        if (!user) {
            throw { status: 401, message: 'Unauthorized.' };
        }

        throw { status: 403, message: 'You do not have permission to access this endpoint.' };
    }

    async update(id, data, user) {
        if (user._id === id || isActionAllowed(ACTIONS.CRUD_USERS, user.role)) {
            this._canUserAddPreferredWorkingHoursPerDay(data.preferredWorkingHoursPerDay, user.role);
            
            const updatedUser = await this.model.findByIdAndUpdate(id, data, { new: true });
            
            return this._transformData(updatedUser);
        }
    
        return Promise.reject({ status: 403, message: 'You do not have permission to access this endpoint.' });
    }

    delete(id, user) {
        if (user._id === id || isActionAllowed(ACTIONS.CRUD_USERS, user.role)) {
            return this.model.deleteOne({_id: id});
        }

        return Promise.reject({ status: 403, message: 'You do not have permission to access this endpoint.' });
    }

    _transformData (data) {
        return {
            _id: data._id.toString(),
            role: data.role,
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            ...( data.preferredWorkingHoursPerDay && {
                preferredWorkingHoursPerDay: data.preferredWorkingHoursPerDay 
            })
        };
    }

    _canUserAddPreferredWorkingHoursPerDay(preferredWorkingHoursPerDay, role) {
        if (preferredWorkingHoursPerDay && (role !== 'user')) {
            return Promise.reject({ status: 400, message: 'Only users have right to add preferred working hours per day.'});
        }
    }
}

export default new UserService(userModel);
