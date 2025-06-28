import { LoadingStyleDiv } from './LoadingStyle'
import loadingGif from '../../assets/images/loading.gif';

const CommonLoading = () => {
  return (
    <LoadingStyleDiv>
      <img src={loadingGif} alt="Loading..." />
    </LoadingStyleDiv>
  )
}

export default CommonLoading