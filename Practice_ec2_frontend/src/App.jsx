import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [apiResp, setapiResp] = useState("");

  async function fetchCatFact() {
    const response = await fetch("/api/catfact");
    const data = await response.json();
    setapiResp(data.fact);
  }

  JSON.stringify(apiResp, null, 2)

  useEffect(() => {
    fetchCatFact();
  }, []);

console.log("App rendered!");


  return (
    <>

    <div>
      <h1>fact:</h1>
      <p>{apiResp}</p>
      <button onClick={fetchCatFact}>new fact</button>


    </div>

    </>
  )
}

export default App


