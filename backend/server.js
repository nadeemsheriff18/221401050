import express from 'express';
import cors from 'cors';
import { Log } from '../logging_middleware/log.js';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
app.use(express.json());

const urls = {};
const clicks = {};

const HOST = "http://localhost";
const PORT = 5000;
const DEFAULT_VALIDITY = 30; // minutes

// POST /shorturls
app.post("/shorturls", async (req, res) => {
  const { url, validity = DEFAULT_VALIDITY, shortcode } = req.body;

  if (!url || !isValidUrl(url)) {
    await Log("backend", "error", "handler", "Invalid URL format");
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let code = shortcode || nanoid(6);
  if (urls[code]) {
    await Log("backend", "error", "handler", "Shortcode already in use");
    return res.status(409).json({ error: "Shortcode already exists" });
  }

  const createdAt = new Date();
  const expiry = new Date(createdAt.getTime() + validity * 60000);

  urls[code] = { longUrl: url, createdAt, expiry };
  clicks[code] = [];

  await Log("backend", "info", "handler", `Created short URL ${code}`);

  return res.status(201).json({
    shortLink: `${HOST}:${PORT}/${code}`,
    expiry: expiry.toISOString()
  });
});


app.get("/:shortcode", async (req, res) => {
  const code = req.params.shortcode;
  const entry = urls[code];

  if (!entry) {
    await Log("backend", "error", "handler", `Shortcode ${code} not found`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const now = new Date();
  if (now > new Date(entry.expiry)) {
    await Log("backend", "warn", "handler", `Shortcode ${code} expired`);
    return res.status(410).json({ error: "Link expired" });
  }

  clicks[code].push({
    timestamp: now.toISOString(),
    referrer: req.get("referer") || "direct",
    location: "Unknown" // IP location lookup can be added later
  });

  await Log("backend", "info", "handler", `Redirected to ${entry.longUrl}`);
  return res.redirect(entry.longUrl);
});

// GET /shorturls/:shortcode → stats
app.get("/shorturls/:shortcode", async (req, res) => {
  const code = req.params.shortcode;
  const entry = urls[code];

  if (!entry) {
    await Log("backend", "error", "handler", `Stats fetch failed: ${code} not found`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  const clickData = clicks[code] || [];
  await Log("backend", "info", "handler", `Fetched stats for ${code}`);

  res.json({
    shortcode: code,
    originalUrl: entry.longUrl,
    createdAt: entry.createdAt,
    expiry: entry.expiry,
    totalClicks: clickData.length,
    clicks: clickData
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


function isValidUrl(str) {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}
