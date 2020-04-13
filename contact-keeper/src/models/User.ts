import * as mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    date?: Date;
}

export const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},

    somethingElse: Number,
});

const User = mongoose.model<IUser>('user', UserSchema);
export default User