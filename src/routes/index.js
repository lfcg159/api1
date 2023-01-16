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

    const { quotes } = req.body;
    await addQuotes(googleSheets, quotes, {
        auth,
        spreadsheetId,
    });

    res.send('siuuuu');
})

const addQuotes = async (googleSheets, quotes, credentials) => {
    const lastQuote = await getLastQuote(googleSheets, credentials);

    console.log(createSubArrayAfterMatch(quotes.reverse(), lastQuote))

    googleSheets.spreadsheets.values.append({
        ...credentials,
        range: `Sheet1!A2`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: createSubArrayAfterMatch(quotes, lastQuote).map(quote => [getColor(quote), quote])
        }
    })
}

const getLastQuote = async (googleSheets, credentials) => {
    const options = {
        ...credentials,
        range: 'Sheet1!B:B',
    };

    const response = await googleSheets.spreadsheets.values.get(options);
    const data = response.data.values;

    return data[data.length - 1][0];
}

const createSubArrayAfterMatch = (originalArray, matchNumber) => {
    const matchIndex = originalArray.findIndex(num => num === Number(matchNumber.replace(',', '.')));
    console.log(matchIndex);
    if (matchIndex === -1) return originalArray;
    return originalArray.slice(matchIndex + 1);
}

const getColor = (quote) => {
    if (quote >= 2 && quote < 10) return 'purple';
    if (quote >= 10) return 'rose';
    return 'blue';
}

module.exports = router;
