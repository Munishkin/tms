class BaseController {
    constructor({ service }) {
        this.service = service;
    }

    getAll(req, res, next) {
        let limit = 0;
        let offset = 0;

        if (+req.query.limit) {
            limit = +req.query.limit;
        }

        if (+req.query.offset) {
            offset = +req.query.offset;
        }

        return this.service
            .getAll(req.user, limit, offset)
            .then(data => res.json(data))
            .catch(next)
    }
    
    getById(req, res, next) {
        return this.service
            .getById(req.params.id, req.user)
            .then(data => {
                if (!data) {
                    return Promise.reject({ status: 404, message: 'There is no user with this id.' })
                }

                return res.json(data)
            })
            .catch(next);
    }

    add(req, res, next) {
        return this.service
            .add(req.body, req.user)
            .then(savedData => res.json(savedData))
            .catch(next);
    }

    update(req, res, next) {
        return this.service
            .update(req.params.id, req.body, req.user)
            .then(savedData => {
                if (!savedData) {
                    return Promise.reject({ status: 404, message: 'There is no user with this id.' })
                }
                return res.json(savedData)
            })
            .catch(next);
    }

    delete(req, res, next) {
        return this.service
            .delete(req.params.id, req.user)
            .then(() => res.json({ message: 'Successfully Deleted'}))
            .catch(next);
    }
}

export default BaseController;
