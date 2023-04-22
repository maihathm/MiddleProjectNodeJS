require('dotenv').config();
const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');

const database = require('./utils/database');
const accountRouter = require('./routers/accountRouter');
const checkLogin = require('./middlewares/checkLogin');
const sleepRouter = require('./routers/sleepRouter');


const app = express();
const PORT = process.env.PORT;
handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context);
});

// connect to database
database.connect();

// set up view engine
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        dateFormat: function (date) {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(date).toLocaleDateString('en-US', options);
        },
        timeFormat: function (time) {
            const hours = Math.floor(time,0);
            const mins = Math.floor(time*60 % 60,0);
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
        },
        totalSleepTime: function(sleepTime, wakeTime) {
            const sleepMins = Math.floor(sleepTime * 60);
            const wakeMins = Math.floor(wakeTime * 60);
            let diffMins = wakeMins - sleepMins;
            if (diffMins < 0) {
              diffMins += 1440; // add 24 hours in minutes
            }
            const hours = Math.floor(diffMins / 60);
            const mins = diffMins % 60;
            return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
          }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true, // Thêm dòng này
    },
}));
app.set('view engine', 'hbs');

// set up middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 },
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/img/avatar', express.static(path.join(__dirname, '/img/avatar')));



// set up routers
app.use('/', accountRouter);


app.use('/home', sleepRouter);

// const User=require("./models/user")
// const SleepRecord=require("./models/SleepRecord")
// app.get('/adddata', async (req, res)=>{
//     const user = await User.findOne({ username: 'admin' });

//     for (let i = 0; i < 30; i++) {
//     const sleepRecord = new SleepRecord({
//         user: user._id,
//         date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)), // set the date to i days ago
//         sleepTime: 23 + Math.random(), // set the sleep time to a random value between 23 and 24 hours
//         wakeTime: 6 + Math.random(), // set the wake time to a random value between 6 and 7 hours
//     });
//     await sleepRecord.save();
//     }
//     res.send("add in")
// });


// 404 error
app.use((req, res) => {
    res.status(404).send('Trang không tồn tại');
});

// 500 error
app.use((err, req, res) => {
    res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại sau');
});

app.listen(PORT, () => console.log('Server is running on http://localhost:' + PORT));
