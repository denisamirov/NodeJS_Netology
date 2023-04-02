const express = require('express')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./db')
const mongoose = require("mongoose")
const userModels = require("./db/models")

//Настройка приложения
const app = express()
app.set('view engine', 'ejs')
app.use("/api/user/", express.static('public'));
app.use("/", express.static('public'));
app.use(express.urlencoded());
app.use(session({ secret: 'SECRET'}));
app.use(passport.initialize())
app.use(passport.session())
//----------------------------------


//Passport для входа пользователя
passport.use('local', new LocalStrategy({
  // Переписываем переменные из того что пришло из формы
  usernameField: 'username',
  passReqToCallback: true
},
  async function (req, username, password, done) {
      // Поиск пользователя по логину
      await userModels.findOne({ username: username }, function (err, user) {
        console.log(user)
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
      }).clone();
  }
))
//----------------------------------

//Passport для регистрации пользователя
passport.use('signup', new LocalStrategy({
  // Переписываем переменные из того что пришло из формы
  usernameField: 'username',
  passReqToCallback: true
},
  async function (req, username, password, done) {
      // Поиск пользователя по логину
      await userModels.findOne({ username: username }, function (err, user) {
        console.log(user)
          if (err) { return done(err); }
          // проверяем результат поиска
          if (!user) {
              var newUser = new userModels();
              newUser.username = username;
              newUser.password = password;
              try {
                newUser.save()
            } catch(e) {
                console.log(e)
            }
              console.log(`Зарегистрирован новый юзер ${newUser}`)
              return done(null, newUser);
          } else {
              console.log(`${username} уже существует`);
              return done(null, false);
          }
      }).clone();
  }
))
//----------------------------------


passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userModels.findById(id, function(err, user) {
    done(err, user);
  });
});

//Роутинг
app.get('/', (req, res) => {
    res.render('home', { user: req.user })
  })

app.get('/api/user/login',   (req, res) => {
    res.render('login')
  })

app.post('/api/user/login',
  passport.authenticate('local', { failureRedirect: '/api/user/login' }),
  (req, res) => {
    console.log("req.user: ", req.user)
    res.redirect('/')
  })

app.get('/api/user/signup',   (req, res) => {
    res.render('registration')
  })  

app.post('/api/user/signup',
  passport.authenticate('signup', { 
          failureRedirect: '/api/user/login', 
          }),
  (req, res) => {
    console.log("req.user: ", req.user)
    res.redirect('/api/user/login')
  })

app.get('/logout',  (req, res) => {
    req.logout(function(err) {
      if (err) {next(err)}
    })
    res.redirect('/')
  })

app.get('/api/user/me',
    (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login')
      }
      next()
    },
    (req, res) => {
      res.render('profile', { user: req.user })
    }
)
//----------------------------------


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