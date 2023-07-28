import { Schema, model, connect } from 'mongoose';


interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
const userSchema = new Schema<IUser>({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    email: {type:String, required: true},
    password: {type:String, required: true},
})

// for relational
// types.objectId
// https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc


  const User = model<IUser>('User', userSchema);

  export {User}



