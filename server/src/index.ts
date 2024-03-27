import express, { Application, Request, Response } from "express";
import cors from 'cors';
import mongoose from 'mongoose';
const app :Application = express();

app.use(cors({
    origin:'*',
}))
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/").then(()=>{
    console.log('Connected To MongoDB');
    app.listen(5000);

}).catch(e=>{
console.log(e);
})