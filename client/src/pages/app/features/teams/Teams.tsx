import { FetchData } from "@/lib/actions";
import { useEffect, useState } from "react";

function Teams() {

  useEffect(() => {
    FetchData(setPageData, '/teams');
  },[])

  const [pageData, setPageData] = useState({});

  return (
    <div>Teams</div>
  )
}

export default Teams