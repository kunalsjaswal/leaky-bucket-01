import groupTable from "../model/Group.model.js";
import userGroupTable from "../model/UserGroup.model.js";
import conn from "../database/Mysql.database.js";

export const CreateGroup = async (req, res) => {
    const { name, description, groupUsers } = req.body;
    if (!name || !groupUsers || groupUsers.length === 0) {
        return res.status(400).json({ status: 400, message: 'Group name and users are required' });
    }

    try {
        await conn.transaction(async (t) => {

            const newGroup = await groupTable.create({ name, description, createdBy: 1 }, { transaction: t });
            const groupId = newGroup.id;

            // Add users to the group

            const userGroupPromises = groupUsers.map(userId => 
                userGroupTable.create({ userId, groupId }, { transaction: t })
            );

            await Promise.all(userGroupPromises);

        });

        res.status(201).json({ status: 201, data: {  }, message: 'Group created successfully' });
    } catch (error) {
        res.status(500).json({ status: 500, data: [], message: error.errors[0].message || 'Internal Server Error' });
    }
}

export const GetAllGroups = async (req, res) => {
    try {
        const groups = await groupTable.findAll({
            attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({ status: 200, data: groups, message: 'Groups fetched successfully' });
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ status: 500, data: [], message: 'Internal Server Error' });
    }
}

export const GetGroupDetails = async (req, res) => {
    const { groupId } = req.params;

    if (!groupId) {
        return res.status(400).json({ status: 400, message: 'Group ID is required' });
    }

    try {
        const groupDetails = await groupTable.findOne({
            where: { id: groupId },
            attributes: ['id', 'name', 'description', 'createdAt', 'updatedAt']
        });

        if (!groupDetails) {
            return res.status(404).json({ status: 404, data: null, message: 'Group not found' });
        }

        const [ rows ] = await conn.query('CALL GetGroupDetailsAndUsers(:groupId)', {
            replacements: { groupId },
        });

        const { finalJson } = rows || {};
        res.status(200).json({ status: 200, data: finalJson, message: 'Group details fetched successfully' });
    } catch (error) {
        console.error('Error fetching group details:', error);
        res.status(500).json({ status: 500, data: [], message: 'Internal Server Error' });
    }
}