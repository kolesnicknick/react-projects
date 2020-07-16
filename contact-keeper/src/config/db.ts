import * as mongoose from 'mongoose';
// @ts-ignore
import * as config from './default.json';

const db = config.mongoURI;

export const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Mongo connected');
  }
  catch (e) {
    console.log(e);
  }
};
