const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')
const mongoose = require('mongoose');
const userModels = require("./db/models")


//-----------------------------------
passport.use('local', new LocalStrategy({
  // Переписываем переменные из того что пришло из формы
  usernameField: 'username',
  passReqToCallback: true
},
  async function (req, username, password, done) {
      // Поиск пользователя по логину
      await userModels.findOne({ login: username }, function (err, user) {
        console.log(username)
          if (err) { return done(err); }
          // проверяем результат поиска
          if (!user) {
              return done(null, false);
          } else {
              // Проверяем пароль
              if (user.password == password) {
                  console.log("Пользователь выполнил вход");
                  return done(null, user);
              } else {
                  console.log('Неправильно введен пароль!');
                  return done(null, false);
              }
          }
      });
  }
))
//-----------------------------------
passport.serializeUser(function(user, done) {

  done(null, user._id);

});

passport.deserializeUser(function(id, done) {

  userModels.findById(id, function(err, user) {

    done(err, user);

  });

});


const app = express()
app.set('view engine', 'ejs')

app.use(express.urlencoded());
app.use(session({ secret: 'SECRET'}));

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('home', { user: req.user })
  })

app.get('/login',   (req, res) => {
    res.render('login')
  })

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    console.log("req.user: ", req.user)
    res.redirect('/')
  })

app.get('/logout',  (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }})
    res.redirect('/')
  })

app.get('/profile',
    (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.redirect('/login')
      }
      next()
    },
    (req, res) => {
      res.render('profile', { user: req.user })
    }
)


app.get('/users', async (req, res) => {
    try {
        const userFromMongo = await userModels.find()
        res.json(userFromMongo)
        console.log(userFromMongo)
    } catch(e) {
        res.status(500).json()
    }
});

mongoose.set("strictQuery", false);
 const PORT = process.env.PORT || 3000
 const UrlDB = "mongodb://localhost:27018/users";
 async function start(PORT, UrlDB) {
    try {
         await mongoose.connect(UrlDB);
         app.listen(PORT)
         console.log(PORT)
         }
     catch(e) {
         console.log(e)
    }
 }


start(PORT, UrlDB)