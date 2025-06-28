import { ExploreChatStyleDiv } from './ExploreChatStyle'
import { useState } from 'react';
import CommonExplore from './CommonExplore';

const ExploreChat = () => {
  const [countGroups, setCountGroups] = useState(3);
  const [groupsList, setGroupsList] = useState([
    {id: 1, name: "Chads from Bangaluru"},
    {id: 2, name: "Family"},
    {id: 3, name: "Unofficial chads"},
    {id: 4, name: "Chads from Bangaluru"},
    {id: 5, name: "Family"},
    {id: 6, name: "Unofficial chads"}
  ]);

  const [countUsers, setCountUsers] = useState(2);
  
  const [usersList, setUsersList] = useState([
    {id: 1, name: "Rohan Sharma"},
    {id: 2, name: "Divyansh Singh"},
    {id: 3, name: "Rohan Sharma"},
    {id: 4, name: "Divyansh Singh"},
    {id: 5, name: "Rohan Sharma"},
    {id: 6, name: "Divyansh Singh"}
  ]);

  const [isChatsOpen, setIsChatsOpen] = useState(false)
  const [isGroupsOpen, setIsGroupsOpen] = useState(false)
  
  return (
    <ExploreChatStyleDiv>
      
      <section className="explore-users">
        <CommonExplore isOpen = {isChatsOpen} title = "Chats" count = {countUsers} list = {usersList}/>
      </section>

      <section className="explore-groups">
        <CommonExplore isOpen = {isGroupsOpen} title = "Groups" count = {countGroups} list = {groupsList}/>
      </section>
    </ExploreChatStyleDiv>
  )
}

export default ExploreChat