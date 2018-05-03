const express = require('express');

const indexRouter = express.Router();

const router = function () {
  indexRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  indexRouter.route('/')
    .get((req, res) => {
      res.render(
        'index',
        {
          title: 'NCCU course system',
          nav: [{ link: '/course', title: 'course' }, { link: '/curriculum', title: 'curriculum' }]
        }
      );
    });
  return indexRouter;
};
module.exports = router;
