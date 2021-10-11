export default (roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            res.status(403);
            return res.json({ error: 'You do not have permission to access this endpoint.'});
        }
        return next();
    }
}
