import { google } from "googleapis";

let connectionSettings: any;

async function getAccessToken() {
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) throw new Error("X-Replit-Token not found for repl/depl");

  connectionSettings = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=google-sheet",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.items?.[0]);

  const accessToken =
    connectionSettings?.settings?.access_token ||
    connectionSettings?.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) throw new Error("Google Sheet not connected");
  return accessToken;
}

async function getAuthClient() {
  const accessToken = await getAccessToken();
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  return oauth2Client;
}

export async function getUncachableGoogleSheetClient() {
  const auth = await getAuthClient();
  return google.sheets({ version: "v4", auth });
}

// Kompweb Contact Leads spreadsheet — created automatically, ID pinned for reliability
const SPREADSHEET_ID = "1UHLLoZMR8rhPQa3UGFh6rEIl18CHdXtOqTYiaOMrThs";

export async function appendContactLead(lead: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  const auth = await getAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:E",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[timestamp, lead.name, lead.phone, lead.email, lead.message]],
    },
  });

  return SPREADSHEET_ID;
}
