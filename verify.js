import dotenv from "dotenv";
dotenv.config();

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id, secret } = req.body;

  // Jika pakai secret
  if (process.env.VERIFICATION_SECRET && secret !== process.env.VERIFICATION_SECRET) {
    return res.status(403).json({ error: "Invalid secret" });
  }

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  return res.status(200).json({
    platform_name: "karen-assistant",
    platform_username: user_id,
    metadata: { verified: true }
  });
}
