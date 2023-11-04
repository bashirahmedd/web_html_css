import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/single_input", (req, res) => {
    res.render('single_input', {
        title: 'Single Input',
        method: 'GET',
        pmsg: req.query.pmsg
    });
});

app.post("/single_input", urlencodedParser, (req, res) => {
    res.render('single_input', {
        title: 'Single Input',
        method: 'POST',
        pmsg: req.body.pmsg
    });
});

app.listen(8080);
