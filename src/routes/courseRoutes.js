const express = require('express');

const allCourse = [
  {
    class: 'Java',
    teacher: 'ChenCzenChia',
    point: 3,
    time: 'FriD56',
    place: 'daRen301',
    department: 'science',
    level: 'acquired'
  },
  {
    class: 'OS',
    teacher: 'HuYUJong',
    point: 3,
    time: 'Tue234',
    place: 'daRen301',
    department: 'science',
    level: 'required'
  },
  {
    class: 'Computer Network',
    teacher: 'ChangHongChin',
    point: 3,
    time: 'Thu234',
    place: 'daRen106',
    department: 'science',
    level: 'group'
  }
];

const courseRouter = express.Router();
const router = function () {
  courseRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  courseRouter.route('/')
    .get((req, res) => {
      res.render(
        'course',
        {
          course: allCourse
        }
      );
    });

  return courseRouter;
};

module.exports = router;
