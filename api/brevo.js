export default async function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘POST, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) {
return res.status(200).end();
}

if (req.method !== ‘POST’) {
return res.status(405).json({ error: ‘Method not allowed’ });
}

const { email } = req.body;

if (!email || !email.includes(’@’)) {
return res.status(400).json({ error: ‘Email inválido’ });
}

try {
const response = await fetch(‘https://api.brevo.com/v3/contacts’, {
method: ‘POST’,
headers: {
‘accept’: ‘application/json’,
‘content-type’: ‘application/json’,
‘api-key’: process.env.BREVO_API_KEY
},
body: JSON.stringify({
email: email,
listIds: [5],
updateEnabled: true
})
});

```
const data = await response.json();

if (response.ok || response.status === 204) {
  return res.status(200).json({ result: 'ok' });
} else {
  console.error('Brevo error:', data);
  return res.status(200).json({ result: 'ok' });
}
```

} catch (error) {
console.error(‘Error:’, error);
return res.status(200).json({ result: ‘ok’ });
}
}
