import React from "react";

const StatsTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <table className="stats-table">
      <thead>
        <tr>
          <th>Short Link</th>
          <th>Original URL</th>
          <th>Created</th>
          <th>Expires</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {data.map((entry, idx) => (
          <tr key={idx}>
            <td>
              <a href={entry.shortLink} target="_blank">{entry.shortLink}</a>
            </td>
            <td>{entry.originalUrl}</td>
            <td>{new Date(entry.createdAt).toLocaleString()}</td>
            <td>{new Date(entry.expiresAt).toLocaleString()}</td>
            <td>{entry.clicks?.length || 0}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StatsTable;
