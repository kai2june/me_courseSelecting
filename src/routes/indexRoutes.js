const express = require('express');

const indexRouter = express.Router();

const academy = ['-', '理學院', '文學院', '社科院', '法學院', '商學院', '外文學院', '傳播學院', '國際學院', '教育學院'];
const degree = ['-', '學士班', '碩士班', '博士班'];
const department = [['-'], ['資科系'], ['中文系'], ['社會系'], ['法律系'], ['金融系'], ['歐語系'], ['新聞系'], ['外交系'], ['教育系']];
const college = {'理學院': {'學士班':['心理系', '應數系', '資科系'], '碩士班': ['心理系', '應數系', '資科系'],'博士班': ['心理系', '應數系', '資科系']}};

const router = function () {
    // indexRouter.use((req, res, next) => {
    //     if (req.user) {
    //         next();
    //     } else {
    //         res.redirect('/');
    //     }
    // });
    indexRouter.route('/')
        .get((req, res) => {
            console.log(college[0]);
            res.render(
                'index',
                {
                    title: 'NCCU course system',
                    nav: [{ link: '/course', title: 'course' }, { link: '/curriculum', title: 'curriculum' }],
                    college: [academy]
                }
            );
        })
        .post( (req,res) => {
            res.render(
                'index',
                {
                    title: 'NCCU course system',
                    nav: [{ link: '/course', title: 'course' }, { link: '/curriculum', title: 'curriculum' }],
                    college: [academy, department]
                }
            )
        });
    return indexRouter;
};
module.exports = router;
