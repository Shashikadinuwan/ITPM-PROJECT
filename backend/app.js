// Import modules
const express = require("express");
const { connect } = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const upload = require('express-fileupload');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Initialize Express app
const app = express();

// Middleware
app.use(morgan('dev')); // Morgan for HTTP request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // Enable CORS for the frontend
app.use(upload()); // File upload middleware
app.use('/uploads', express.static(__dirname + '/uploads')); // Serve uploaded files statically

// Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/posts', postRoutes); // Post routes

// Error handling middleware
app.use(notFound); // Handle 404 Not Found errors
app.use(errorHandler); // Handle other errors

// Connect to MongoDB and start the server
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
})
.catch(error => {
    console.error("Error connecting to MongoDB:", error);
});
