import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import {backend,canisterId,createActor,idlFactory} from "../../declarations/backend"
function App() {
  const [count, setCount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchCount = async () => {
    try {
      console.log('Fetching count from backend...', backend, canisterId, idlFactory, createActor);
      setLoading(true);
      const result = await backend.get();
      setCount(Number(result));
    } catch (err) {
      console.error('Backend connection failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      console.log('Incrementing count on backend...', JSON.stringify(backend));
      await backend?.inc(); // Increment the count by 1
      await fetchCount(); // Fetch the new count
    } catch (err) {
      console.error('Increment failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the count on page load
  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://github.com/demergent-labs/azle"
          target="_blank"
        >
          <span className="logo-stack">
            qwert
          </span>
        </a>
      </div>
      <h1>Vite + React + Azle</h1>
      <div className="card">
        <button onClick={increment} style={{ opacity: loading ? 0.5 : 1 }}>
          Count is {count !== undefined ? count : '...'}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and Azle logos to learn more
      </p>
    </div>
  );
}

export default App;