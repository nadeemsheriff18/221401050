import React, { useState } from "react";
import StatsTable from "../components/StatsTable";
import "./Stats.css";

const Stats = () => {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const handleFetchStats = async () => {
    if (!shortcode.trim()) {
      setError("Please enter a shortcode.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/shorturls/${shortcode}`);
      if (!res.ok) {
        throw new Error("Shortcode not found or expired");
      }

      const data = await res.json();
      setStats(data);
      setError("");
    } catch (err) {
      setStats(null);
      setError(err.message);
    }
  };

  return (
    <div className="stats-container">
      <h2>Short URL Statistics</h2>

      <input
        type="text"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        placeholder="Enter shortcode"
        className="shortcode-input"
      />
      <button onClick={handleFetchStats}>Get Stats</button>

      {error && <p className="error">{error}</p>}
      {stats && <StatsTable data={stats} />}
    </div>
  );
};

export default Stats;
