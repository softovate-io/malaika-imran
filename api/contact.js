export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!process.env.WEB3FORM_KEY) {
      console.error("WEB3FORM_KEY is missing from environment variables");
      return res.status(500).json({ message: "Missing API key" });
    }

    const payload = {
      ...body,
      access_key: process.env.WEB3FORM_KEY,
    };

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Web3Forms error:", data);
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}