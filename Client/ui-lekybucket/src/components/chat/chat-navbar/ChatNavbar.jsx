import React, { useEffect, useState } from "react";
import { ChatNavbarStyle } from "./ChatNavbarStyle";
import GroupsIcon from "@mui/icons-material/Groups";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupDetail } from "../../../redux/chat/chatThunks";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { textColors } from "../../../assets/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { border, maxHeight } from "@mui/system";
import { searchUserNotInGroup } from "../../../redux/group/groupSlice";
import Chip from "@mui/material/Chip";

const options = ["Add Member", "About"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

const userStyle = {
  maxHeight: "10rem",
  overflow: "auto",
};

const ChatNavbar = (props) => {
  const { name, id, description } = props;

  const dispatch = useDispatch();
  const { selectedObject } = useSelector((state) => state.chat);
  const { users } = useSelector((state) => state.users);
  const [groupUsers, setGroupUsers] = useState([]);

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
  const handleOpenMemberModal = () => setOpenAddMemberModal(true);
  
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const handleOpenAboutModal = () => setOpenAboutModal(true);
  
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [selectedSearchUser, setSelectedSearchUser] = useState(null);

  const handleCloseMemberModal = () => {
    setSearchedUsers([]);
    setSelectedSearchUser(null);
    setOpenAddMemberModal(false);
  }

  const handleCloseAboutModal = () => {
    setOpenAboutModal(false);
  }

  const handleOnOptionClick = (option) => {
    if (option === "Add Member") {
      handleOpenMemberModal();
    } else {
      handleOpenAboutModal();
    }
  };

  

  const handleSearchUser = (e) => {
    const key = e.target.value;

    if (key.length > 0) {
      const groupUserIds = (selectedObject?.groupUsers || []).map((u) => u.id);
      const searchResult = users.filter(
        (user) =>
          !groupUserIds.includes(user.id) &&
          (user.name.toLowerCase().includes(key.toLowerCase()) ||
            user.email.toLowerCase().includes(key.toLowerCase()))
      );

      setSearchedUsers(searchResult);
    } else {
      setSearchedUsers([]);
    }

    setSelectedSearchUser(null)
  };

  const handleOnSearchUserClick = (user) => {
    setSelectedSearchUser(user);
    setSearchedUsers([])
  };

  const handleDeleteChip = () => {
    setSelectedSearchUser(null);
    setSearchedUsers([])
  }

  return (
    <ChatNavbarStyle>
      <h3>
        <GroupsIcon className="grp-icon" fontSize="large" />
        {name}
      </h3>

      <div className="group-details">
        <AvatarGroup max={5}>
          {groupUsers?.map((user) => (
            <Avatar
              key={user.id}
              alt={user.name}
              sx={{ width: 28, height: 28, fontSize: 14 }}
            >
              {getProfileIcon(user.name)}
            </Avatar>
          ))}
        </AvatarGroup>

        <div className="group-options">
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon style={{ color: textColors.profileIconTextColor }} />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                style: {
                  width: "20ch",
                },
              },
              list: {
                "aria-labelledby": "long-button",
              },
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                onClick={() => handleOnOptionClick(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          {/* Modal for add group  */}
          <Modal
            open={openAddMemberModal}
            onClose={handleCloseMemberModal}
            className="add-user-modal"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="add-user-box">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Member
              </Typography>
              <Divider sx={{ mt: 1, mb: 3 }} />
              <div className="add-member-form">
                {
                  !selectedSearchUser ?
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    fullWidth
                    size="small"
                    variant="outlined"
                    onChange={handleSearchUser}
                  /> :
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    disabled
                    size="small"
                    variant="outlined"
                    value=""
                    InputProps={{
                      startAdornment: 
                        <Chip
                          avatar={
                            <Avatar alt={selectedSearchUser?.name}>
                              {getProfileIcon(selectedSearchUser?.name)}
                            </Avatar>
                          }
                          label={`${selectedSearchUser?.name} ( ${selectedSearchUser?.email} )`}
                          onDelete={handleDeleteChip}
                          sx={{ mr: 1 }}
                        />
                    }}
                  />
                }


                {/* user search result  */}
                <List
                  style={userStyle}
                  className="user-search-list"
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {searchedUsers.length > 0 &&
                    searchedUsers.map((user) => (
                      <ListItem
                        className="search-user-item"
                        key={user.id}
                        onClick={() => handleOnSearchUserClick(user)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "grey.200",
                          },
                          bgcolor: selectedSearchUser?.id === user.id ? "grey.200" : null
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar alt={user.name}>
                            {getProfileIcon(user.name)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={user.email}
                        />
                      </ListItem>
                    ))}
                </List>

                <Button
                  style={{ float: "right" }}
                  sx={{ mt: 4 }}
                  variant="contained"
                  size="small"
                  color="success"
                  disabled={!selectedSearchUser}
                >
                  Add
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal for About Group  */}
          <Modal
            open={openAboutModal}
            onClose={handleCloseAboutModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                About
              </Typography>
              <Divider sx={{ mt: 1 }} />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {description}
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </ChatNavbarStyle>
  );
};

export default ChatNavbar;
