import { FetchData } from "@/lib/actions";
import { useEffect, useState } from "react";

function MyPolls() {
  useEffect(() => {
    FetchData(setPageData, '/my_polls');
  },[])

  const [pageData, setPageData] = useState({});

  return (
    <div className="w-full flex flex-col justify-start items-center gap-5">
      <div className="w-full flex flex-row justify-between items-center ">
        <h1 className="text-4xl">123 Polls</h1>
      </div>
      <div>
        Table with all the polls
      </div>
    </div>
  )
}

export default MyPolls