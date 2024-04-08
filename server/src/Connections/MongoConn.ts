import mongoose from "mongoose";
import { config } from "dotenv";config ();

export const MongoConn =() =>{ 
mongoose.connect(process.env.host||" ", {
  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('MongoDB connection error:', error);
});

}