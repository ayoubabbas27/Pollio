import { Outlet } from "react-router-dom"
import { CUSTOM } from "@/components"

function DashLayout() {
  return (
    <div className="w-full flex flex-col lg:flex-row ">
        <CUSTOM.DashNav />
        <div className="w-full p-5 mt-14 lg:mt-0 lg:p-7">
          <Outlet />
        </div>
    </div>
  )
}

export default DashLayout