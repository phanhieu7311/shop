var express=require('express');
var mongoose=require('mongoose');
var cookieParser=require('cookie-parser');

var userRoute=require('./routes/user.route');
var loginRoute=require('./routes/login.route');
var adminRoute=require('./routes/admin.route');
var sessionMiddleware=require('./middlewares/session.middleware');

var app=express();
var server=require('http').createServer(app);
server.listen('3333');

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

mongoose.connect('mongodb://localhost/karma');

var session=require('express-session');
app.use(session({
    secret:'secret',
    resave:false
}))

app.use(cookieParser('qwerty'));

app.use(sessionMiddleware);

app.use('/',userRoute);
app.use('/',loginRoute);
app.use('/admin/',adminRoute);


