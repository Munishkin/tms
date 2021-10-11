import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('local'), function(req, res) {
    return res.json(req.user);
});

export default router;
