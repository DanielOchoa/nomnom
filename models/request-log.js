
import mongoose from 'mongoose';
import config from '../config.js';

const { Schema } = mongoose;

const requestLogSchema = new Schema({
	srcAddr:   String,
	srcPort:   String,
	dstAddr:   String,
	dstPort:   String,
	startTime: String
});

export default mongoose.model('RequestLog', requestLogSchema);
