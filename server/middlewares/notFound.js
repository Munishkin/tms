export default (req, res, next) => {
    res.status(404);
    res.json({ message: `${req.path} page not found.`});
}