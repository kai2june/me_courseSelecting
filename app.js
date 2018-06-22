const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// app.use(morgan('combined'));
// app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'course', resave: 'true', saveUninitialized: 'true' }));
app.use(express.static(path.join(__dirname, '/public/')));
require('./src/config/passport.js')(app);

app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, './node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const authRouter = require('./src/routes/authRoutes')();
const indexRouter = require('./src/routes/indexRoutes')();
const courseRouter = require('./src/routes/courseRoutes')();
const curriculumRouter = require('./src/routes/curriculumRoutes')();
const adminRouter = require('./src/routes/adminRoutes')();

app.use('/auth', authRouter);
app.use('/index', indexRouter);
app.use('/course', courseRouter);
app.use('/curriculum', curriculumRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    debug(`Running on port ${chalk.green(port)}`);
    console.log(`Running on port ${chalk.green(port)}`);
});
