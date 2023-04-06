import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Wod() {
  const [programming, setProgramming] = useState("conditioning");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    if(loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate-wod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ programming }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result.replaceAll('\n', '<br />'));

    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Generate Workout</title>
        
      </Head>

      <main className={styles.main}>
      <img src="/loading.gif" className={styles.loading} />
        <h3>Crossfit workout generator</h3>

        <form onSubmit={onSubmit}>
          <select value={programming} onChange={(e) => setProgramming(e.target.value)}>
              <option value="conditioning">Conditioning</option>
              <option value="gymnastics">Gymnastics</option>
              <option value="weightlifting">Weightlifting</option>
          </select>
            <input type="submit" value="Generate Workout" />
        </form>

        {loading && (
          <div>
            <h3>Looking for the best gift ideas 🎁 💡</h3>
            <img src="/loading.gif" className={styles.loading} />
          </div>
        )}
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}
