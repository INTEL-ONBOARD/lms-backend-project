module.exports.logger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.warn(`[${currentTime}] ${req.method} request to ${req.url}`);
    next();
};