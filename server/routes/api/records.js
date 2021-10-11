import express from 'express';
import RecordsController from '../../controllers/recordsController';

const router = express.Router();

router
    .route('/')
    .get(RecordsController.getAll.bind(RecordsController))
    .post(RecordsController.add.bind(RecordsController));

router
    .route('/:id')
    .get(RecordsController.getById.bind(RecordsController))
    .put(RecordsController.update.bind(RecordsController))
    .delete(RecordsController.delete.bind(RecordsController));

export default router;
