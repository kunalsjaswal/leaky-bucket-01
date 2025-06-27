import { Alert } from '@mui/material'
import { AlertStyleDiv } from './AlertStyle'

const CommonAlert = ({message, type}) => {
  

  return (
    <AlertStyleDiv>
          <Alert variant="filled" severity={`${type ? type : 'success'}`}>{ message }.</Alert>
    </AlertStyleDiv>
  )
}

export default CommonAlert