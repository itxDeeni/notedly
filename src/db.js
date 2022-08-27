const mongoose = require('mongoose');

module.exports ={
  connect:DB_HOST => {
    //Use the mongo driver's updated drivers URL string parser
    mongoose.set('useNewUrlParser', true);
    //Use find and update instead of find and modify
    mongoose.set('useFindAndModify',false);
    //use create Index instead of ensureIndex
    mongoose.set('useCreateIndex', true);
    //use the new server discovery and monitoring engine
    mongoose.set('useUnifiedTopology', true);
    //connect to the DB
    mongoose.connect(DB_HOST);
    //log an error if we fail to connect
    mongoose.connection.on('err',err=>{
      console.log(err);
      console.log('MongoDB connection error. Please make sure MongoDB is running');
      process.exit();
    }

    )
  },
  close:()=>{
    mongoose.connection.close()
  }
}