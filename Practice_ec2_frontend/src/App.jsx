import { useEffect, useState, useCallback } from "react";
import "./App.css";

function App() {
  const [apiResp1, setApiResp1] = useState("");

  const fetchCatFact1 = useCallback(async () => {
    const response = await fetch("/api/catfact");
    if (!response.ok) throw new Error("Failed to fetch cat fact");
    const data = await response.json();
    setApiResp1(data.fact);
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const response = await fetch("/api/catfact");
      if (!response.ok) return;
      const data = await response.json();
      if (!cancelled) setApiResp1(data.fact);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1>Fact1:</h1>
      <p>{apiResp1}</p>
      <button onClick={fetchCatFact1}>new fact 1</button>

    </div>
  );
}

export default App;
