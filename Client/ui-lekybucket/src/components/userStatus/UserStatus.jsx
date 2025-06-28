import React, { useEffect, useState } from "react";
import { UserStatusStyleDiv } from "./UserStatusStyle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { bgColors } from "../../assets/colors";
import { Accordion, AccordionDetails, AccordionSummary, Badge, Tooltip } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fetchUsersList } from "../../redux/users/usersThunks";
import { useSelector, useDispatch } from "react-redux";
import LoadingContent from "../../common/loadingContent/LoadingContent";

const UserStatus = () => {

  const dispatch = useDispatch()
  const { users, count, loading } = useSelector(state => state.users);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    dispatch(fetchUsersList());

    setUsersList(users?.map(user => { return {...user, isActive: false}}))
  }, [count])

  const getProfileIcon = (name) => {
    const names = name.split(" ");

    let icon = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      icon += names[names.length - 1].charAt(0).toUpperCase();
    }

    return icon;
  };
  
  // Helper to format time difference as "2 min ago", "2 hrs ago", etc.
  const timeAgo = (timestamp) => {
    
    // Convert string timestamp to Date object if necessary
    const ts = new Date(timestamp).getTime();
    
    const now = Date.now();
    const diff = now - ts;

    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds} sec ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hrs ago`;

    const days = Math.floor(hours / 24);
    if (days == 1) return `${days} day ago`;
    else if (days < 30) return `${days} days ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} mon ago`;

    const years = Math.floor(months / 12);
    return `${years} yr ago`;
  };

  const [isOpen, setIsOpen] = useState(true)
  
  const handleOnAccordianClick = () => {
    setIsOpen(prev => !prev);
  }


  return (
    <UserStatusStyleDiv>
      <Accordion
        expanded={isOpen}
        onClick={handleOnAccordianClick}
        className='accordian'
        sx={{
          boxShadow: 'none',
          '&:before': { display: 'none' }
        }}
      >
        <AccordionSummary>
          <header>
            { isOpen ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
            <h4> Members </h4>
            <Badge badgeContent={ users.length } color="secondary" />
          </header>
        </AccordionSummary>

        <AccordionDetails>
          {
            loading && 
            <LoadingContent />
          }
          {
            count > 0 && !loading && 
            (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  bgcolor: bgColors.loginPanelLightColor,
                }}
              >
                {   
                  usersList.map((user, indx) => (
                    <React.Fragment key={user.id}>
                      <ListItem alignItems="flex-start">

                        <Tooltip title = {user.email} placement="top">
                          <ListItemAvatar>
                            <div className="profile-icon">
                              { getProfileIcon(user.name)}
                            </div>
                          </ListItemAvatar>
                        </Tooltip>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: "text.primary", display: "inline" }}
                              >
                                { user.isActive ? <span style={{color:"green"}}>Online</span>: timeAgo(user.lastSeen) }
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {
                        (indx < users.length - 1) && 
                        <Divider variant="inset" component="li" />
                      }
                    </React.Fragment>
                  ))
                }
              </List>
            )
          }
        </AccordionDetails>

      </Accordion>
    </UserStatusStyleDiv>
  );
};

export default UserStatus;
