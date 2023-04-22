const express = require('express');
const hbs = require('express-handlebars')
const mongoose = require('mongoose');
const sleepRoutes = require('./routers/sleepRouter');
const bodyParser = require('body-parser')
const port=3000
const app = express();

mongoose.connect('mongodb://localhost/sleep-tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))

app.use(express.urlencoded({ extended: true }));

app.use('/', sleepRoutes);

app.use((req, res) => {
    res.status(404)
    res.render('404')
})
app.use((err, req, res, next) => {
    res.status(505)
    res.render('505')
})

app.listen(port, () => console.log(
    `Express started on: http://localhost:${port};`))
