//import modules
const express = require("express");
const {connect} = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const upload = require('express-fileupload')


const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

//app
const app = express();
connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch(error => {
    console.error("Error connecting to MongoDB:", error);
});


app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials:true, origin:"http://localhost:3000/"}))
app.use(upload())
app.use('/uploads',express.static(__dirname +'/uploads'))

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

app.use(notFound)
app.use(errorHandler)

