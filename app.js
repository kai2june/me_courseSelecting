const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, './node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, './node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, './node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const courseRouter = require('./src/routes/courseRoutes')();
const curriculumRouter = require('./src/routes/curriculumRoutes')();

app.use('/course', courseRouter);
app.use('/curriculum', curriculumRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'NCCU course system',
      nav: [{ link: '/course', title: 'course' }, { link: '/curriculum', title: 'curriculum' }]
    }
  );
});
app.listen(port, () => {
  debug(`Running on port ${chalk.green(port)}`);
  console.log(`Running on port ${chalk.green(port)}`);
});
