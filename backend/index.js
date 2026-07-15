const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const connectDB = require('./utils/db.js')
const userRoute = require('./routes/user.route.js'); 
const companyRoute = require('./routes/company.route.js'); 
const jobRoute = require('./routes/job.route.js'); 
const applicationRoute = require('./routes/application.route.js'); 

dotenv.config({});


// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOption = {
    origin : 'http://localhost:5173',
    credentials : true,
}
app.use(cors(corsOption));

app.get("/", (req, res) => {
    res.send("Server is running");
});


// API'S

app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job' , jobRoute);
app.use('/api/v1/application',applicationRoute)
// http://localhost:3000/api/v1/user/register
// http://localhost:3000/api/v1/user/login
// http://localhost:3000/api/v1/user/profile/update

const port = process.env.PORT;
app.listen(port , ()=>{
    connectDB();
    console.log(`app listining on ${port}`);
})