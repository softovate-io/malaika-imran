export default function handler(req, res) {
  res.setHeader("Content-Type", "application/javascript");
  res.send(`
    window.ENV = {
      CONTENTFUL_SPACE_ID: "${process.env.CONTENTFUL_SPACE_ID}"
    };
  `);
}