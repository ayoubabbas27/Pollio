import { Link } from "react-router-dom"

function DashSideBar() {
  return (
    <div className="flex flex-col justify-center items-start gap-5 ml-5 text-red-500">
        <Link to="/dash">Dashboard</Link>
        <Link to="/dash/my_polls">My polls</Link>
        <Link to="/dash/teams">teams</Link>
        <Link to="/dash/polling_requests">My polls</Link>
    </div>

  )
}

export default DashSideBar