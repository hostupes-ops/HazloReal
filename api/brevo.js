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

try {
// Parse body — works both when Vercel auto-parses and when it doesn’t
let email;
if (typeof req.body === ‘string’) {
email = JSON.parse(req.body).email;
} else if (req.body && req.body.email) {
email = req.body.email;
} else {
return res.status(400).json({ error: ‘No email provided’ });
}

```
if (!email || !email.includes('@')) {
  return res.status(400).json({ error: 'Email inválido' });
}

const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
  console.error('BREVO_API_KEY not found in environment');
  return res.status(500).json({ error: 'Config error' });
}

const response = await fetch('https://api.brevo.com/v3/contacts', {
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'api-key': apiKey
  },
  body: JSON.stringify({
    email: email,
    listIds: [5],
    updateEnabled: true
  })
});

const text = await response.text();
console.log('Brevo response status:', response.status);
console.log('Brevo response body:', text);

return res.status(200).json({ result: 'ok' });
```

} catch (error) {
console.error(‘Function error:’, error.message);
return res.status(500).json({ error: error.message });
}
}
