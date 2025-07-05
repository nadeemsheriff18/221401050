import fetch from 'node-fetch';


const LOG_API = "http://20.244.56.144/evaluation-service/logs";

const validStacks = ["backend", "frontend"];
const validLevels = ["debug", "info", "warn", "error", "fatal"];
const validPackages = [
  "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service",
  "component", "hook", "page", "state", "style", "auth", "config", "middleware", "utils"
];
const ACCESS_TOKEN = (() => {
  const raw = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjE0MDEwNTBAcmFqYWxha3NobWkuZWR1LmluIiwiZXhwIjoxNzUxNjkzNzg3LCJpYXQiOjE3NTE2OTI4ODcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4MWU2OTI4Yi1lMzU2LTQ4MDgtOGNhMy1hODA5MjczMDZlNjkiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJuYWRlZW0gc2hlcmlmZiBhIiwic3ViIjoiZGZkNmYzNWYtMzc2OC00NTIxLTkxOTQtNzRlMzRhNTAyNDQxIn0sImVtYWlsIjoiMjIxNDAxMDUwQHJhamFsYWtzaG1pLmVkdS5pbiIsIm5hbWUiOiJuYWRlZW0gc2hlcmlmZiBhIiwicm9sbE5vIjoiMjIxNDAxMDUwIiwiYWNjZXNzQ29kZSI6ImNXeWFYVyIsImNsaWVudElEIjoiZGZkNmYzNWYtMzc2OC00NTIxLTkxOTQtNzRlMzRhNTAyNDQxIiwiY2xpZW50U2VjcmV0IjoiZWNZVVpOVlRld0VtQkhqUyJ9.6j2ctKeaxrHYHPIAwv73Y1trQ-v7UwJcV2lzySDxv8g"; // your token
  return raw.replace(/[\n\r\t]+/g, "").trim(); // remove invisible characters
})();

export async function Log(stack, level, pkg, message) {
  
  if (!validStacks.includes(stack)) return console.warn("Invalid stack:", stack);
  if (!validLevels.includes(level)) return console.warn("Invalid level:", level);
  if (!validPackages.includes(pkg)) return console.warn("Invalid package:", pkg);

  try {
    console.log(ACCESS_TOKEN)
    const res = await fetch(LOG_API, {
      method: "POST",
      headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${ACCESS_TOKEN}`
},
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Log submitted:", data.logID);
    } else {
      console.error("Failed to log:", data);
    }
  } catch (err) {
    console.error("Log error:", err.message);
  }
}
