import { Router } from "express";
import { appendContactLead } from "../lib/sheets";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact-leads", async (req, res) => {
  const { name, phone, email, message } = req.body as {
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    res.status(400).json({ error: "name, email, and message are required" });
    return;
  }

  try {
    const spreadsheetId = await appendContactLead({
      name: name.trim(),
      phone: (phone ?? "").trim(),
      email: email.trim(),
      message: message.trim(),
    });
    logger.info({ spreadsheetId }, "Contact lead saved to Google Sheets");
    res.json({ ok: true, spreadsheetId });
  } catch (err) {
    logger.error(err, "Failed to save contact lead to Google Sheets");
    res.status(500).json({ error: "Failed to save lead" });
  }
});

export default router;
