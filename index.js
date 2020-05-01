const debug = require('debug')('app:startup');
const config=require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express=require('express');
const app=express();
const courses=require('./routes/courses');
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));
app.use(helmet());
app.use('/api/course',courses);

//Configuration
console.log('Application Name:'+config.get('name'));
console.log('Mail Server:'+config.get('mail.host'));
console.log('Mail password:'+config.get('mail.password'));
if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    debug('Morgan enabled');
}


app.get('/',(req,res)=>{
    res.send('Hello World!!!!');
});


//PORT
const port = process.env.PORT|| 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));