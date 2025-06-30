import React from 'react'
import { ChatContainerStyledDiv } from './ChatContainerStyle'
import { useSelector } from 'react-redux';

const ChatContainer = () => {

  const { selectedGroup } = useSelector(state => state.group);

  

  return (
    <ChatContainerStyledDiv>
      {
        selectedGroup ? 
        selectedGroup.name : 
        'Please Select the Group'
      }
    </ChatContainerStyledDiv>
  )
}

export default ChatContainer