import { SignupStyledDiv } from './SingupStyle';

const Signup = (props) => {

  const { togglePage } = props;

  return (
    <SignupStyledDiv>
      <h2>Signup</h2>  
      <button onClick={() => togglePage(true)}>Log in</button>
    </SignupStyledDiv>
  )
}

export default Signup