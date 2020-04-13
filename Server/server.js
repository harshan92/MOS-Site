const express=require("express"); // framework for http routes
const morgon=require("morgan");//http request logger, middleware , 
const bodyParser=require("body-parser");// request data reader
const mongoose=require("mongoose");//mongo db handler, db agent
const cors=require("cors");//cross origin resource sharing

const config=require("./config");

//instance of express app
const app = express();

mongoose.connect(config.database, err=>{
    if(err){
        console.log(err);
    }else{
        console.log("Connected to db server");
    }
});

app.use(bodyParser.json()); //reading data with json format
app.use(bodyParser.urlencoded({extended:false}));//when it false extended, it read all sort of file formats
app.use(morgon("dev"));//this will log all request to the terminal
app.use(cors());

const mainRoutes=require("./routes/main");
const userRoutes=require("./routes/accounts");

app.use("/api", mainRoutes);
app.use("/api/accounts", userRoutes);

app.listen(3030, err=>{
    console.log("Server is running.. port: "+config.port);
});