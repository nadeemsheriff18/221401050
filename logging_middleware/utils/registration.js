// register.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const register = async () => {
  const res = await fetch("http://20.244.56.144/evaluation-service/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "221401054@rajalakshmi.edu.in",
    name: "Nithishvar",
    mobileNo: "9841385390",
    githubUsername: "nithishvar",
    rollNo: "221401054",
    accessCode: "cWyaXW"
    }),
  });

  const data = await res.json();
  console.log("Registration successful:");
  console.log(data);
};

register().catch(err => {
  console.error("Registration failed:", err.message);
});



