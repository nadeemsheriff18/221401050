import React from "react";

const ShortenForm = ({ index, urlData, onChange }) => {
  return (
    <div className="shorten-form">
      <input
        type="text"
        placeholder="Long URL"
        value={urlData.url}
        onChange={(e) => onChange(index, "url", e.target.value)}
      />
      <input
        type="number"
        placeholder="Validity (min)"
        value={urlData.validity}
        onChange={(e) => onChange(index, "validity", e.target.value)}
      />
      <input
        type="text"
        placeholder="Custom shortcode (optional)"
        value={urlData.shortcode}
        onChange={(e) => onChange(index, "shortcode", e.target.value)}
      />
    </div>
  );
};

export default ShortenForm;
