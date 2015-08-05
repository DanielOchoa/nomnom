
import mongoose from 'mongoose';

const { Schema } = mongoose;

const requestLogSchema = new Schema({
	src_addr:   String,
	src_port:   String,
	dst_addr:   String,
	start_time: String,
});

export default mongoose.model('RequestLog', requestLogSchema);
