const mongoose=require('mongoose');

const mongoURI="mongodb://127.0.0.1:27017/cloudscribble?directConnection=true"



const connectToMongo = async () => {
    try {
      mongoose.set("strictQuery", false);
      mongoose.connect(mongoURI);
      console.log("Connected to mongoDB successfully");
    } catch (error) {
      console.log(error);
      process.exit();
    }
  };
  
  module.exports = connectToMongo;  