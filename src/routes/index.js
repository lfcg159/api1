const { Router } = require('express');
const router = Router();
const { google } = require('googleapis')

router.post('/', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '1Sy0M6CAY2cnfUmK0QLP4OvaKqFOS_TcipNaA8cy5Qkw'

    const { quote, time } = req.body;
    await addQuotes(googleSheets, quote, time, {
        auth,
        spreadsheetId,
    });

    res.send('siuuuu');
})

const addQuotes = async (googleSheets, quote, time, credentials) => {
    const date = new Date(time);
    const daySeconds = (date.getHours() * 60 + date.getMinutes()) * 60 + date.getSeconds();
    const day = date.getDay();

    googleSheets.spreadsheets.values.append({
        ...credentials,
        range: `Sheet1!A2:C`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[getColor(quote), daySeconds, day]]
        }
    })
}

const getColor = (quote) => {
    if (quote >= 2 && quote < 10) return 'purple';
    if (quote >= 10) return 'rose';
    return 'blue';
}

module.exports = router;
