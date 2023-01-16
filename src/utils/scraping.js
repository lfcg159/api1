// username = '1075321691'
// password = 'mortal500'

// aviator-quotes@aviator-quotes.iam.gserviceaccount.com

// [...document.querySelectorAll("div.pointer")].map(item => Number(item.textContent.trim().replace('x ','')))
// Number(document.querySelector("div.pointer").textContent.trim().replace('x ',''))

const sendQuotes = (quotes) => {
    fetch('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({
            quotes
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(res => res.text())
        .then(console.log)
}

let currentQuote;
let iteration = 0;
setInterval(() => {
    if (iteration === 0) {
        const initialQuotes = [...document.querySelectorAll("div.pointer")].map(item => Number(item.textContent.replace(' ', '').replace('x ', '')));

        sendQuotes(initialQuotes);
    }

    const quote = Number(document.querySelector("div.pointer").textContent.replace(' ', '').replace('x ', ''))

    if (quote !== currentQuote && iteration > 0) {
        currentQuote = quote;
        sendQuotes([quote]);
    }

    iteration++;
}, 5000);
