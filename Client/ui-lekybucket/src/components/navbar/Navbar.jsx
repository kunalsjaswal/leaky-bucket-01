import { NavbarStyledDiv } from './NavbarStyle'
import {Button} from '@mui/material'

const Navbar = () => {

  // replace this later from redux state
  const profileInfo = {
    name: "Kunal Singh Jaswal",
    email: "kunal@gmail.com"
  }

  // only allowing first and last name letter
  const getProfileIcon = (name) => {
    const names = name.split(' ');

    let icon = names[0].charAt(0).toUpperCase();
    if(names.length > 1) {
      icon += names[names.length - 1].charAt(0).toUpperCase();
    }

    return icon;
  }

  return (
    <NavbarStyledDiv>
      <section className="profile-view">
        <div className="profile-icon">
          <h3>{ getProfileIcon(profileInfo.name) } </h3>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{ profileInfo.name }</h3>
          <p className="profile-email">{ profileInfo.email }</p>
        </div>
        <div className="logout">
          <Button variant="contained" color="error" size='small' className="logout-button">Logout</Button>
        </div>
      </section>
    </NavbarStyledDiv>
  )
}

export default Navbar