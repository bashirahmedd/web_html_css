import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname);

const app = express();
app.use(cors());
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

app.post("/login", urlencodedParser, (req, res) => {
    res.render('login', {
        title: 'login success',
        method: 'POST',
        msg: 'Hurrah! Login is successful',
        username1: req.body.username1,
        pwd: '****************'
    });
});

const port=8080;
app.listen(port, function () {
    console.log('Ready to serve web clients around the globe!');
    console.log('Listening on Port : ' + port);
});
