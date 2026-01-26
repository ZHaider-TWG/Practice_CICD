import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [apiResp, setApiResp] = useState("");

  const fetchCatFact = useCallback(async () => {
    const response = await fetch("/api/catfact");
    if (!response.ok) throw new Error("Failed to fetch cat fact");
    const data = await response.json();
    setApiResp(data.fact);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const response = await fetch("/api/catfact");
      if (!response.ok) return;
      const data = await response.json();
      if (!cancelled) setApiResp(data.fact);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  console.log("App rendered!");

  return (
    <div>
      <h1>fact:</h1>
      <p>{apiResp}</p>
      <button onClick={fetchCatFact}>new fact</button>
    </div>
  );
}

export default App;
