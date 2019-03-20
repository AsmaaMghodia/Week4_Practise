
const volunteer = require('./routes/volunteers');
const leaders = require('./routes/leaders');
const borad = require('./routes/borad');

const express = require ('express');
const app = express();
app.use (express.json());

app.use('/ieee', volunteer);
app.use('/leader', leaders);
app.use('/borad', borad);
console.log("sda")
dateNow = new Date();
////var x = Joi.date().format('YYYY-MM-DD');
//console.log(x )
app.listen(8000);

//var dt = new Date(year, month[, date, hour, minute, second, millisecond]);


