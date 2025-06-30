import React, { useEffect, useState } from 'react'
import { ChatNavbarStyle } from './ChatNavbarStyle'
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroupDetail } from '../../../redux/chat/chatThunks';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const ChatNavbar = (props) => {
  const { name, id } = props;

  const dispatch = useDispatch();
  const { selectedObject, countUsers } = useSelector(state => state.chat);
  const [groupUsers, setGroupUsers] = useState([])

  useEffect(() => {
    dispatch(fetchGroupDetail(id));
  }, [id]);

  useEffect(() => {
    setGroupUsers(selectedObject?.groupUsers || []);
  }, [selectedObject]);

  // only allowing first and last name letter
  const getProfileIcon = (name) => {
    const names = name.split(" ");

    let icon = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      icon += names[names.length - 1].charAt(0).toUpperCase();
    }

    return icon;
  };
  // Example usage: replace Avatar's alt and children with initials
  const userName = "Kunal Singh"; // Replace with dynamic value as needed

  return (
    <ChatNavbarStyle>
      <h3>
        <GroupsIcon className='grp-icon' fontSize='large'/>
        { name } 
      </h3>

      <div className="group-details">
        <AvatarGroup max={5}>
          {
            groupUsers?.map(user => (
              <Avatar 
                key={user.id}  
                alt={user.name}
                sx={{ width: 28, height: 28, fontSize: 14 }} 
              >
                {getProfileIcon(user.name)}
              </Avatar>
            ))
          }
        </AvatarGroup>


      </div>
    </ChatNavbarStyle>
  )
}

export default ChatNavbar