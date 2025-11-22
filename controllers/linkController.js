import connectDB from "../config/db.js";
import Link from "../models/Link.js";


export const healthz = (req, res) => {
  res.status(200).json({ ok: true, version: "1.0" });
};

// CREATE LINK
export const createLink = async (req, res) => {
  try {
    const { code, url } = req.body;

    // Validate fields
    if (!code || !url)
      return res.status(400).json({ error: "code and url required" });

    // Check duplicate
    const exists = await Link.findOne({ code });
    if (exists) return res.status(409).json({ error: "code already exists" });

    const link = await Link.create({ code, url });
    res.status(201).json(link);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIST ALL LINK
export const getLinks = async (req, res) => {
  const links = await Link.find().sort({ createdAt: -1 });
  res.json(links);
};


export const getLinkStats = async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOne({ code });
  if (!link) return res.status(404).json({ error: "not found" });

  res.json(link);
};

// DELETE LINK
export const deleteLink = async (req, res) => {
  const { code } = req.params;

  const deleted = await Link.findOneAndDelete({ code });
  if (!deleted) return res.status(404).json({ error: "not found" });

  res.json({ ok: true });
};


export const handleRedirect = async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOne({ code });
  if (!link) return res.status(404).send("Not found");

  link.totalClicks += 1;
  link.lastClicked = new Date();
  await link.save();

  let finalUrl = link.url.trim();
  if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
    finalUrl = "https://" + finalUrl;
  }


  res.redirect(finalUrl);
};

