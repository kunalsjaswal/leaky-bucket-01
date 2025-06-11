import groupTable from '../model/Group.model.js';
import MessageModel from '../model/Message.model.js';

export const addMessage = async (req, res) => {
    console.log('Received request to add message:', req.body);
    const { groupId, userId, message } = req.body;
    
    if (!groupId || !userId || !message) {
        return res.status(400).json({ status: 400, message: 'Group ID, User ID and Message are required' });
    }
    
    try {
        const newMessage = await MessageModel.create({
            group_id : groupId,
            sender_id : userId,
            content : message,
        });
    
        res.status(201).json({ status: 201, data: newMessage, message: 'Message added successfully' });
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ status: 500, data: [], message: error.errors[0].message || 'Internal Server Error' });
    }
}

export const getMessages = async (req, res) => {
    const { groupId } = req.params;
    const lastTimestamp = req.query.lastTimestamp ? new Date(req.query.lastTimestamp) : new Date();

    if (!groupId) {
        return res.status(400).json({ status: 400, message: 'Group ID is required' });
    }

    const validGroupId = groupTable.findAll({
        where: { id: groupId }
    });

    if (!validGroupId) {
        return res.status(404).json({ status: 404, message: 'Group not found' });
    }
    
    try {
        const messages = await MessageModel.find({
            group_id: groupId,
            timestamp: { $lt: lastTimestamp }
        }).sort({ timestamp: -1 }).limit(2).exec();
    
        
        res.status(200).json({ status: 200, data: messages, message: 'Messages fetched successfully' });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ status: 500, data: [], message: error.errors[0].message || 'Internal Server Error' });
    }
}