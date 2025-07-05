import React, { useState } from "react";
import ShortenForm from "../components/ShortenForm";
import ResultCard from "../components/ResultCard";
import "./Shortener.css"

const Shortener = () => {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleAddInput = () => {
    if (urls.length >= 5) return;
    setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
  };

  const updateUrlInput = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleSubmit = async () => {
    const newResults = [];

    for (const input of urls) {
      if (!input.url.trim()) continue;

      try {
        const response = await fetch("http://localhost:5000/shorturls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: input.url,
            ...(input.validity && { validity: parseInt(input.validity) }),
            ...(input.shortcode && { shortcode: input.shortcode }),
          }),
        });

        const data = await response.json();
        newResults.push({ original: input.url, shortLink: data.shortLink, expiry: data.expiry });
      } catch (err) {
        newResults.push({ original: input.url, error: "Failed to shorten URL" });
      }
    }

    setResults(newResults);
  };

  return (
    <div className="shortener-container">
      <h2>URL Shortener</h2>

      {urls.map((input, index) => (
        <ShortenForm
          key={index}
          index={index}
          urlData={input}
          onChange={updateUrlInput}
        />
      ))}

      <div className="shortener-actions">
        <button onClick={handleAddInput} disabled={urls.length >= 5}>+ Add URL</button>
        <button onClick={handleSubmit}>Shorten</button>
      </div>

      <div className="shortener-results">
        {results.map((r, idx) => (
          <ResultCard key={idx} data={r} />
        ))}
      </div>
    </div>
  );
};

export default Shortener;
