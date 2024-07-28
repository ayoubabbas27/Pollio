import axios from "axios"
import { useEffect, useState } from "react"
import { FetchData } from "@/lib/actions"

function Dashboard() {
  
  useEffect(() => {
    FetchData(setPageData, '/dashboard');
  },[])

  const [pageData, setPageData] = useState({});


  return (
    <main className="w-full h-full grid gap-4 justify-items-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
      {/*Activity summary */}
      <div>Total polls created</div>
      <div>Total polls participated</div>
      <div>Teams joined</div>
      {/*Poll stats */}
      <div>Recent polls created</div>
      <div>Poll Engagement</div>
      {/*Notification and Alerts */}
      <div>Notifications for polling requests</div>
    </main>
  )
}

export default Dashboard