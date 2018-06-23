const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app.local.strategy');
const mysql = 

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'studentID',
        passwordField: 'password'
    }, (studentID, password, done) => {
        // const con = mysql.createConnection({
        //     host: "localhost",
        //     user: "root",
        //     password: "toor",
        //     database: "courseSelectingDb"
        // });
        // con.connect( (err) => {
        //     if(err)
        //         throw err;
        //     else{
        //         console.log('mysql connected!!');
        //         let sql = `SELECT * FROM backendStaff WHERE userName = '${userName}'`;
        //         con.query(sql, (err, result) => {
        //             if(err) throw err;
        //             else{
        //                 console.log(result[0].userName);
        //                 console.log(result[0].password);
        //                 console.log(password);
        //                 if(result.length == 0){
        //                     console.log('No this user');
        //                     done(false, null, {message: 'Input an existing user'});
        //                 }
        //                 else if(result[0].password == password){
        //                     console.log(`result.password=${result[0].password}, password=${password}`);
        //                     done(null, result);
        //                 }
        //                 else{
        //                     console.log('We are in Else');
        //                     done(null, false, {message: 'Wrong password'});
        //                 }
        //             }
        //         });
        //     }
        // })
        const url = 'mongodb://localhost:27017';
        const dbName = 'courseApp';
        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                const db = client.db(dbName);
                const col = db.collection('users');
                const user = await col.findOne({studentID});
                if ( !user ){
                    done(null, false);
                } else if ( user.password === password){
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                console.log(err);
            }
            client.close();
        }());
    }));
};
