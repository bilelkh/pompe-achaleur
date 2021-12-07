const express = require("express");
const path = require("path");
const { google } = require("googleapis");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
// All other GET requests not handled before will return our React app

// app.use(express.static(path.resolve(__dirname, "./build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./build", "index.html"));
// });

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./build")));

// Handle GET requests to /api route
app.post("/api", async (req, res) => {
  console.log("=== req.body===", req.body);
  const ip = req.socket.remoteAddress;
  const { type, mode, firstName, lastName, email, codePostal, phone } =
    req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ],
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets   API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1b8br9rCrajEpBBRifw2-WgX_C40i4ycvJxYfp7LSAHM";

  // Write row(s) to spreadsheet
  const result = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "A1:A4",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[ip, type, mode, firstName, lastName, email, codePostal, phone]],
    },
  });

  res.json(result);
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

app.post("/", async (req, res) => {});

app.listen(process.env.PORT || 3000, (req, res) =>
  console.log("running on 1337")
);
