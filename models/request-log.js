
import mongoose from 'mongoose';

const { Schema } = mongoose;

const requestLogSchema = new Schema({}, {strict: false});

export default mongoose.model('RequestLog', requestLogSchema);
