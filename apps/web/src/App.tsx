// @deno-types="@types/react"
import { useEffect, useState } from "react";
// @ts-expect-error Unable to infer type at the moment
import reactLogo from "./assets/react.svg";
import "./App.css";
import { api } from "./api.ts";

function App() {
  const [name, setName] = useState("");

  async function onPost() {
    const res = await api.index.$post({
      json: {
        name: "deno",
      },
    });
    const data = await res.json();
    console.log(data);
  }

  useEffect(() => {
    api.index.$get().then(async (data) => {
      const name = await data.json();
      setName(name);
    });
  }, []);

  return (
    <>
      <img src="/vite-deno.svg" alt="Vite with Deno" />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={onPost}>name is {name}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
