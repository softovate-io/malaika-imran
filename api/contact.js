export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript");

  res.send(`
    window.ENV = {
      CONTENTFUL_SPACE_ID: "${process.env.CONTENTFUL_SPACE_ID}",
      CONTENTFUL_ACCESS_TOKEN: "${process.env.CONTENTFUL_ACCESS_TOKEN}",
      WEB3FORM_KEY: "${process.env.WEB3FORM_KEY}"
    };
  `);
}