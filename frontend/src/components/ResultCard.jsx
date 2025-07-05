import React from "react";

const ResultCard = ({ data }) => {
  return (
    <div className="result-card">
      <p><strong>Original:</strong> {data.original}</p>
      {data.error ? (
        <p className="error">{data.error}</p>
      ) : (
        <>
          <p><strong>Shortened:</strong> <a href={data.shortLink} target="_blank">{data.shortLink}</a></p>
          <p><strong>Expires:</strong> {data.expiry}</p>
        </>
      )}
    </div>
  );
};

export default ResultCard;
