const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
  })
);


//set view engine
app.set('view engine', 'ejs');

//load static assets
app.use('/css', express.static(path.join(__dirname,"assets/css")))
app.use('/js', express.static(path.join(__dirname, "assets/js")));
app.use('/img', express.static(path.join(__dirname, "assets/img")));

const route = require('./server/router');

app.use('/', route);



app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});