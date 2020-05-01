const config=require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const express=require('express');
const app=express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));
app.use(helmet());

//Configuration
console.log('Application Name:'+config.get('name'));
console.log('Mail Server:'+config.get('mail.host'));

if(app.get('env') === 'development')
{
    app.use(morgan('tiny'));
    console.log('Morgan enabled');
}

const courses=[ 
{id:1, name:'course1'},
{id:2, name:'course2'},
{id:3, name:'course3'}
];
app.get('/',(req,res)=>{
    res.send('Hello World!!!!');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('Given id is not found');
    res.send(course);
}); 

app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body) ;
    if(error) return res.status(400).send({data: null, message: result.error.details[0].message, error:true});
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.send({data: course, message: "course added", error: false});
});



app.put('/api/courses/:id', (req,res)=>{
    //Check if course exists
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('Given id is not found');
    
    //validate the request
    const { error }=validateCourse(req.body);
    if(error) return res.status(400).send({data: null, message: result.error.details[0].message, error:true});

    //update the course
    course.name=req.body.name;
    res.send(course);
});


app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('Given id is not found');
    
    const index=courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});



function validateCourse(course)
{
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema) ;
}




//PORT
const port = process.env.PORT|| 3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));