import crypto from 'crypto';
import userService from '../services/userService';
import BaseController from './baseController';

class UserController extends BaseController{
    constructor() {
        super({
            service: userService
        });
    }

    add(req, res, next) {
        const salt = crypto.randomBytes(16);

        crypto.pbkdf2(req.body.password, salt, 10000, 32, 'sha256', (err, password) => {
            if (err) {
                return next(err);
            }

            return this.service
                .add({
                    ... req.body, 
                    password,
                    salt
                },
                req.user
                )
                .then(user => res.json(user))
                .catch(next);
        });
    }

    getAll(req, res, next) {
        const query = [req.user];
        
        if(req.query.fetchOnlyUsers) {
            query.push(req.query.fetchOnlyUsers);
        }

        if (+req.query.limit) {
            query.push(+req.query.limit);
        }

        if (+req.query.offset) {
            query.push(+req.query.offset);
        }

        return this.service
            .getAll(...query)
            .then(data => res.json(data))
            .catch(next)
    }
}

export default new UserController();
