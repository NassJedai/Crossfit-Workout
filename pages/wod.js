import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Wod() {
  const [program, setProgram] = useState("conditioning");
  const [result, setResult] = useState("");

  const handleChange = (event) => {
    setProgram(event.target.value);
    };


  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ program: program }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Generate Workout</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Crossfit workout generator</h3>

        <form onSubmit={onSubmit}>
        <select value={program} onChange={handleChange}>
            <option value="conditioning">Conditioning</option>
            <option value="gymnastics">Gymnastics</option>
            <option value="weightlifting">Weightlifting</option>
        </select>
          <input type="submit" value="Generate Workout" />
        </form>

        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
