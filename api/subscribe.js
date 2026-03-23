export default async function handler(req, res) {
  const { email } = req.body;

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      email: email,
      listIds: [5], // 👈 CAMBIA 3 POR TU ID REAL
      updateEnabled: true,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
