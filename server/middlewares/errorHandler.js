export default (error, req, res, next) => {
    if (error.status) {
        res.status(error.status);
    } else {
        res.status(400);
    }

    return res.json({ error: error.message });
}