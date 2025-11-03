export default async function handler(req, res) {
  const { spaceId, contentType } = req.query;

  if (!spaceId || !contentType) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=${contentType}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}