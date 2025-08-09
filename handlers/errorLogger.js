module.exports = (err, req, res, next) => {
    const currentTime = new Date().toISOString();
    console.error(`[${currentTime}] Error occurred: ${err.message} Error stack: ${err.stack} at ${req.method} request to ${req.url}`);
    res.status(500).send('Internal Server Error');
};
