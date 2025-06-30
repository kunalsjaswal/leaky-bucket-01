import React from 'react'
import { ChatContainerStyledDiv } from './ChatContainerStyle'
import { useSelector } from 'react-redux';
import ChatNavbar from './chat-navbar/ChatNavbar';
import CommonLoading from '../../common/loading/CommonLoading';

const ChatContainer = () => {

  const { selectedGroup } = useSelector(state => state.group);
  const { loading } = useSelector(state => state.chat);

  if(selectedGroup === null) return (<></>);

  return (
    
    <ChatContainerStyledDiv>
      {
        loading  &&  <CommonLoading />
      }
      <ChatNavbar name = {selectedGroup.name} id = {selectedGroup.id}/>

    </ChatContainerStyledDiv>
  )
}

export default ChatContainer