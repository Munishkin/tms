import recordsModel from '../models/records';
import userModel from '../models/user';
import { isActionAllowed } from '../utils';
import { ACTIONS } from '../constants';

class RecordsService {
    constructor (model) {
        this.model = model;
    }

    async getAll(user, limit = 0, offset = 0) {
        let records = [];

        if (isActionAllowed(ACTIONS.CRUD_RECORDS, user.role)) {
            records = await this.model
                .find()
                .populate('userId', 'preferredWorkingHoursPerDay')
                .lean()
                .sort({ date: 1 })
                .limit(limit)
                .skip(offset);
        }

        if (user.role === 'user') {
            records = await this.model
            .find({ userId: user._id })
            .populate('userId', 'preferredWorkingHoursPerDay')
            .lean()
            .sort({ date: 1 })
            .limit(limit)
            .skip(offset);
        }

        return records.map(({userId, ...other}) => ({
            ...(userId.preferredWorkingHoursPerDay && 
            { preferredWorkingHoursPerDay: userId.preferredWorkingHoursPerDay }),
            ...other
        }));
    }

    getById(id, user) {
        return this._checkUserAccessToRecord(id, user);
    }

    async add(data, user) {
        if (user.role === 'user') {
            if (data.userId && data.userId !== user._id) {
                throw { status: 403, message: 'You cannot create records for other users.' };
            }

            return this.model({ ...data, userId: user._id }).save();
        }
        if (isActionAllowed(ACTIONS.CRUD_RECORDS, user.role) && data.userId !== user._id) {
            await this._checkUserExists(data.userId);
            
            return this.model(data).save();
        }

        throw { status: 403, message: 'You do not have permission to access this endpoint.' };
    }

    async update(id, data, user) {
        await this._checkUserAccessToRecord(id, user);

        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id, user) {
        await this._checkUserAccessToRecord(id, user);
        
        return this.model.findByIdAndRemove(id);
    }

    async _checkUserAccessToRecord(recordId, user) {
        const record = await this.model.findById(recordId);

        if (record.userId.toString() === user._id || isActionAllowed(ACTIONS.CRUD_RECORDS, user.role)) {
            return record;
        }

        throw { status: 404, message: 'Not found for you.' };
    }

    async _checkUserExists(id) {
        const userExists = await userModel.exists({ _id: id});

        if (!userExists) {
            throw { status: 400, message: 'Manipulating records for nonexistent users is not allowed.'};
        }
    }
}

export default new RecordsService(recordsModel);
