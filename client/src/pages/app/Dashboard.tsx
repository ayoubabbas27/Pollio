import axios from "axios"
import { useEffect, useState } from "react"
import { FetchData } from "@/lib/actions"
import { useAuthContext } from "./hooks/useAuthContext"

interface PageData {
  totalPolls: number;
  totalVotes: number;
}

function Dashboard() {
  const context = useAuthContext()

  useEffect(() => {
    FetchData(setPageData, '/dashboard', context.state.user.userObj.id);
  },[])

  const [pageData, setPageData] = useState<PageData>({ totalPolls: 0, totalVotes: 0 });


  return (
    <main className="w-full h-full grid gap-4 justify-items-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
      <div className="p-4 flex flex-col justify-center items-start gap-3 border-2 border-slate-200 rounded-md w-full"> 
        <span className="text-xl font-semibold">Total polls created</span>
        <span className="text-muted-foreground">{new Intl.NumberFormat().format(pageData.totalPolls) }</span>
      </div>
      <div className="p-4 flex flex-col justify-center items-start gap-3 border-2 border-slate-200 rounded-md w-full"> 
        <span className="text-xl font-semibold">Total votes received</span>
        <span className="text-muted-foreground">{new Intl.NumberFormat().format(pageData.totalVotes)}</span>
      </div>
      <div className="p-4 flex flex-col justify-center items-start gap-3 border-2 border-slate-200 rounded-md w-full"> 
        <span className="text-xl font-semibold">Poll-to-Vote Ratio</span>
        <span className="text-muted-foreground">{
          pageData.totalVotes == 0 ? 0 : new Intl.NumberFormat().format(pageData.totalPolls / pageData.totalVotes)
        }</span>
      </div>

    </main>
  )
}

export default Dashboard