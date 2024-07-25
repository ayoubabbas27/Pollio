import axios from 'axios'
import { useEffect, useState } from 'react'



function App() {

  const [backendData, setBackendData] = useState([]);

  async function fetchAPI (){
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.fruits);
    setBackendData(response.data.fruits);
  }
  
  useEffect(() => {
    fetchAPI();
  },[])

  return (
    <>
      {
        backendData.map((element, index) => (
          <div key={index}>{element}</div>
        ))
      }
    </>
  )
}

export default App
