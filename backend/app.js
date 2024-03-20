//import modules
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();


const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

//app
const app = express();
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials:true, origin:"http://localhost:3000/"}))

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(5000,()=>console.log("server running"))

//db

/*mongoose
.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch((err)=> console.log("DB CONNECTION ERROR",err));

//middleware
app.use(morgan("dev"));
app.use(cors({origin: true, creadentals: true}));

//routes
const testRoutes = require("./routes/test");
app.use("/",testRoutes);

//port
const port = process.env.PORT || 8080;

//listener
 app.listen(port, () =>
console.log(`server is running on port ${port}`)
);*/