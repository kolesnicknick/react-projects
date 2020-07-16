import * as mongoose from 'mongoose';

export interface IContact extends mongoose.Document {
  user?: string;
  name: string;
  email?: string;
  phone?: string;
  type?: string;
  date?: Date;
}

export const ContactSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  type: { type: String, default: 'personal' },
  date: { type: Date, default: Date.now },

  somethingElse: Number,
});

const Contact = mongoose.model<IContact>('contact', ContactSchema);
export default Contact;
