const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getToken = async () => {
  const res = await fetch("http://20.244.56.144/evaluation-service/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "221401054@rajalakshmi.edu.in",
      name: "nithishvar",
      rollNo: "221401054",
      accessCode: "cWyaXW",
      clientID: "c6ca2451-53d7-4b0d-8a76-7aacd77ecbe6",
      clientSecret: "gtgCbSPqycaJZkjn"
    }),
  });

  const data = await res.json();
  console.log("Access Token:");
  console.log(data);
};

getToken().catch(err => {
  console.error("Auth failed:", err.message);
});
