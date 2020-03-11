var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var port = process.env.PORT || 7777

var indexRouter = require('./routes/index')
var reRouter = require('./routes/re')


var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/re', reRouter)



// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})
  
  // error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
  
    // render the error page
    res.status(err.status || 500)
    res.render('error')
});

app.listen(port, () => {
    console.log('Starting node.js on port ' + port)
})
  
  module.exports = app