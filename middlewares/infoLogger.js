module.exports.logger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.warn(`==> ip: ${req.ip} ::::: [${currentTime}] ${req.method} request to ${req.url}`);
    next();
};