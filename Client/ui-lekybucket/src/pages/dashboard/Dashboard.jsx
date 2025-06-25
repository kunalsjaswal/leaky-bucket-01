import { DashboardStyledDiv } from './DashboardStyle'
import Navbar from '../../components/navbar/Navbar'
import ChatContainer from '../../components/chat/ChatContainer'

const Dashboard = () => {
  return (
    <DashboardStyledDiv>
      <div className="chat-navbar">
        <Navbar />
      </div>
      <div className="chat-container">
        <ChatContainer />
      </div>
    </DashboardStyledDiv>
  )
}

export default Dashboard