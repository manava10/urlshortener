const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require('./config/connectDb');
const urlRoutes = require('./routes/urlRoutes');

// CORS must be configured BEFORE routes
app.use(cors({
    origin: '*' // Allow all origins for development (change to specific origin in production)
}));
app.use(express.json());
app.use('/api',urlRoutes);

const port = process.env.PORT || 4000;
const startServer = async () =>{
    try{
        await connectDb();
        app.listen(port,()=>{
            console.log(`Server is running at port ${port}`);
        })
    }catch(err){
        console.log(err);
    }
}

startServer();