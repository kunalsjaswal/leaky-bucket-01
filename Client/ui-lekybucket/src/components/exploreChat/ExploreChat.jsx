import { ExploreChatStyleDiv } from "./ExploreChatStyle";
import { useEffect, useState } from "react";
import CommonExplore from "./CommonExplore";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGroupsList } from "../../redux/group/groupThunks";

const ExploreChat = () => {
  const [countGroups, setCountGroups] = useState(3);
  const [groupsList, setGroupsList] = useState([]);

  const {
    groups,
    count: groupCount,
    loading: groupLoading,
  } = useSelector((state) => state.group);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserGroupsList(user.id));

    setGroupsList(groups);
  }, [groupCount]);

  const [countUsers, setCountUsers] = useState(2);

  const [usersList, setUsersList] = useState([
    { id: 1, name: "Rohan Sharma" },
    { id: 2, name: "Divyansh Singh" },
  ]);

  const [selectedChat, setSelectedChat] = useState(-1);
  const [selectedGroup, setSelectedGroup] = useState(-1);

  const updatedSelection = (type, id) => {
    if(type === 'Groups') {
      setSelectedGroup(id);
      setSelectedChat(-1);
    } else {
        setSelectedChat(id);
        setSelectedGroup(-1);
      }
  }
  

  return (
    <ExploreChatStyleDiv>
      <section className="explore-users">
        <CommonExplore
          title="Chats"
          count={countUsers}
          list={usersList}
          selected = {selectedChat}
          updatedSelection = {updatedSelection}
        />
      </section>

      <section className="explore-groups">
        <CommonExplore
          title="Groups"
          count={groupCount}
          list={groupsList}
          loading={groupLoading}
          selected = { selectedGroup}
          updatedSelection = {updatedSelection}
        />
      </section>
    </ExploreChatStyleDiv>
  );
}

export default ExploreChat;
