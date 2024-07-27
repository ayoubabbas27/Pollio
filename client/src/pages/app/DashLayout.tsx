import { Outlet } from "react-router-dom"
import { CUSTOM } from "@/components"

function DashLayout() {
  return (
    <div className="dash-container"> {/*Add the styles for the main container for the app */}
        <CUSTOM.DashSideBar />
        <Outlet />
    </div>
  )
}

export default DashLayout