const express = require('express');
const bodyParser = require('body-parser');
const store = require('./store');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

//  Serve the /createUser endpoint to write some data to the database.
app.post('/createUser', (req, res) => {
    store
        .createUser({
            username: req.body.username,
            password: req.body.password
        })
        .then(() => {
            res.sendStatus(200);
            // res.send("We did it!");
        })
});

app.post('/login', (req, res) => {
    store
        .authenticate({
            username: req.body.username,
            password: req.body.password
        })
        .then(({ success }) => {
            if(success) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(401);
            }
    })
});

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
});