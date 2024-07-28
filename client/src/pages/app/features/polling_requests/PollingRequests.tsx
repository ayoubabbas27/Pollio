import axios from "axios"
import { useEffect, useState } from "react"
import { FetchData } from "@/lib/actions"


function PollingRequests() {

  const [pageData, setPageData] = useState({});
  
  useEffect(() => {
    FetchData(setPageData, '/polling_requests');
  },[])

  return (
    <div>PollingRequests</div>
  )
}

export default PollingRequests