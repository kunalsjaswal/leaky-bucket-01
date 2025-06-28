import React, { useState } from "react";
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

const UserStatus = () => {
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
    const now = Date.now();
    const diff = now - timestamp;

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

  // Helper to generate a random timestamp within the last 7 days
  const getRandomDateWithin7Days = () => {
    const now = Date.now();
    const sevenDaysMs =  60 * 60 * 1000;
    return now - Math.floor(Math.random() * sevenDaysMs);
  };

  const [isOpen, setIsOpen] = useState(true)
  
  const handleOnAccordianClick = () => {
    setIsOpen(prev => !prev);
  }

  const [users, setUsers] = useState([
    {id: 1, name: "Kunal Singh Jaswal", email: "abs@gmail.com", isActive: true, lastSeen: Date.now()},
    {id: 2, name: "Divyansh Singh", email: "abs@gmail.com", isActive: false, lastSeen: getRandomDateWithin7Days()},
    {id: 3, name: "Rohan Sharma", email: "abs@gmail.com", isActive: false, lastSeen: getRandomDateWithin7Days()},
    {id: 4, name: "Yatin Gill", email: "abs@gmail.com", isActive: true, lastSeen: Date.now()},
    {id: 5, name: "Yuvraj Singh", email: "abs@gmail.com", isActive: false, lastSeen: getRandomDateWithin7Days()},
  ]);

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
          <List
            sx={{
              width: "100%",
              maxWidth: 400,
              bgcolor: bgColors.loginPanelLightColor,
            }}
          >
            {
              users.map((user, indx) => (
                <React.Fragment>
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
        </AccordionDetails>

      </Accordion>
    </UserStatusStyleDiv>
  );
};

export default UserStatus;
