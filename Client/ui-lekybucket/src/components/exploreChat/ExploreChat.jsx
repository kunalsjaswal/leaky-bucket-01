import { ExploreChatStyleDiv } from './ExploreChatStyle'
import { useEffect, useState } from 'react';
import CommonExplore from './CommonExplore';
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserGroupsList } from '../../redux/group/groupThunks';

const ExploreChat = () => {
  const [countGroups, setCountGroups] = useState(3);
  const [groupsList, setGroupsList] = useState([]);

  const { groups, count: groupCount , loading: groupLoading } = useSelector(state => state.group);
  const  { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchUserGroupsList(user.id));

    setGroupsList(groups);
  }, [groupCount])
  
  

  const [countUsers, setCountUsers] = useState(2);
  
  const [usersList, setUsersList] = useState([
    {id: 1, name: "Rohan Sharma"},
    {id: 2, name: "Divyansh Singh"},
  ]);

  const [isChatsOpen, setIsChatsOpen] = useState(false)
  const [isGroupsOpen, setIsGroupsOpen] = useState(false)
  
  return (
    <ExploreChatStyleDiv>
      
      <section className="explore-users">
        <CommonExplore isOpen = {isChatsOpen} title = "Chats" count = {countUsers} list = {usersList}/>
      </section>

      <section className="explore-groups">
        <CommonExplore isOpen = {isGroupsOpen} title = "Groups" count = {groupCount} list = {groupsList}  loading = {groupLoading}/>
      </section>
    </ExploreChatStyleDiv>
  )
}

export default ExploreChat