import express from 'express';
import UserController from '../../controllers/userController';

const router = express.Router();

router
    .route('/')
    .get(UserController.getAll.bind(UserController))
    .post(UserController.add.bind(UserController));

router
    .route('/:id')
    .get(UserController.getById.bind(UserController))
    .put(UserController.update.bind(UserController))
    .delete(UserController.delete.bind(UserController));

export default router;
