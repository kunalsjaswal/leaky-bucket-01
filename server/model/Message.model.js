import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    group_id: {
        type: Number,  
        required: true,
        index: true,                          
    },
    sender_id: {
        type: Number,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'read'],
        default: 'sent',
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true,                         
    },
});
    
const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;