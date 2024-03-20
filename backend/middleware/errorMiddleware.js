// Unsupported (404) routes
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404); // Corrected from req.status(404);
    next(error);
}

// Middleware to handle errors
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) { // Changed res.headerSent to res.headersSent
        return next(error);
    }

    res.status(error.code || 500).json({ message: error.message || "An unknown error occurred" }); // Corrected from req.status to res.status
}

module.exports = { notFound, errorHandler }; // Corrected from module.export to module.exports
