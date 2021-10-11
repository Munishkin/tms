import express from 'express';
import ensureLoggedIn from '../../middlewares/ensureLoggedIn';
import forbidRoles from '../../middlewares/forbidRoles';
import records from './records';
import users from './users';

const router = express.Router();

router.use('/records', ensureLoggedIn, forbidRoles(['manager']), records);
router.use('/users', ensureLoggedIn, users);

export default router;
