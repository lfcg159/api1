const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const bp = require('body-parser')

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }))
app.use(require('./routes/index'));

app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)


app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});