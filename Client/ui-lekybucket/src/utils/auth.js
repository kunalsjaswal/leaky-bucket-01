import { useSelector } from "react-redux";

export const isAuthenticated = () => {
  // Check if the user is authenticated
  // This could be a check for a token in localStorage or a cookie
  
  const {user, isAuthenticated} = useSelector((state) => state.auth);
  
  return isAuthenticated && user ? true : false;
}
