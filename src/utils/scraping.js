// username = '1075321691'
// password = 'mortal500'

// aviator-quotes@aviator-quotes.iam.gserviceaccount.com

// [...document.querySelectorAll("div.pointer")].map(item => Number(item.textContent.replace(' ', '').replace('x ','')))
// Number(document.querySelector("div.pointer").textContent.replace(' ', '').replace('x ',''))

const sendQuotes = (quote, time) => {
    fetch('http://localhost:3000', {
        method: 'POST',
        body: JSON.stringify({
            quote,
            time,
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
    const quote = Number(document.querySelector("div.pointer").textContent.replace(' ', '').replace('x ', ''))

    if (quote !== currentQuote) {
        const time = new Date().getTime();
        sendQuotes(quote, time);
        currentQuote = quote;
    }

    iteration++;
}, 5000);
