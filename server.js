import express from "express";
import mongoose from "mongoose";
import { contactRoutes } from "./routes/contactRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import {config} from "dotenv";
config({path:".env"});

const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, {dbName:"contactAPI"}).then(()=>{
    console.log("Mongo is connected........");
}).catch((err)=>{
    console.log(err);
});

app.use('/api/contact',contactRoutes);
app.use("/api/user", userRoutes); 

const port = process.env.PORT;

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${port}`);
});
