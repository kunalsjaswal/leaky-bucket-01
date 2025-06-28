import { NavbarStyledDiv } from "./NavbarStyle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

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
        <div className="profile-icon">
          <h3>{getProfileIcon(profileInfo.name)} </h3>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{profileInfo.name}</h3>
          <p className="profile-email">{profileInfo.email}</p>
        </div>
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
    </NavbarStyledDiv>
  );
};

export default Navbar;
