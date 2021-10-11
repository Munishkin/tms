export default function ensureLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(401);
        res.json({ error: 'Unauthorized.' });
    }
}