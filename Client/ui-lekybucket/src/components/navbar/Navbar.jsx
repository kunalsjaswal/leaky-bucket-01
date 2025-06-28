import { NavbarStyledDiv } from "./NavbarStyle";
import { Button, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import ExploreChat from "../exploreChat/ExploreChat";
import UserStatus from "../userStatus/UserStatus";
import React from "react";

const Navbar = () => {
  // replace this later from redux state
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const profileInfo = {
    name: user.name,
    email: user.email,
  };

  // only allowing first and last name letter
  const getProfileIcon = (name) => {
    const names = name.split(" ");

    let icon = names[0].charAt(0).toUpperCase();
    if (names.length > 1) {
      icon += names[names.length - 1].charAt(0).toUpperCase();
    }

    return icon;
  };

  const handleOnLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <NavbarStyledDiv>
      <section className="profile-view">
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <div className="profile-icon">
                { getProfileIcon(profileInfo.name)}
              </div>
            </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                component="h2"
                variant="body1"
                sx={{ fontSize:'125%', fontWeight: 'bold' }}
              >
                {profileInfo.name}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  { profileInfo.email }
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
       
        <div className="logout">
          <Button
            variant="contained"
            color="error"
            size="small"
            className="logout-button"
            onClick={handleOnLogoutClick}
          >
            Logout
          </Button>
        </div>
      </section>
      <Divider variant="inset" component="div" />


      <hr />
      <section className="content-scroll">
      
        <section className="explore-view">
          <ExploreChat />
        </section>

        <section className="user-status">
          <UserStatus />
        </section>

      </section>
    </NavbarStyledDiv>
  );
};

export default Navbar;
