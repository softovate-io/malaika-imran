// export default function handler(req, res) {
//   res.setHeader("Content-Type", "application/javascript");

//   res.send(`
//     window.ENV = {
//       CONTENTFUL_SPACE_ID: "${process.env.CONTENTFUL_SPACE_ID}",
//       CONTENTFUL_ACCESS_TOKEN: "${process.env.CONTENTFUL_ACCESS_TOKEN}",
//       WEB3FORM_KEY: "${process.env.WEB3FORM_KEY}"
//     };
//   `);
// }


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const body = JSON.parse(req.body);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WEB3FORM_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error sending to Web3Forms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}