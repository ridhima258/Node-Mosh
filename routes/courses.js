const express=require('express');
const router = express.Router();

const courses=[ 
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
    ];

router.get('/',(req,res)=>{
    res.send(courses);
});

router.get('/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('Given id is not found');
    res.send(course);
}); 

router.post('/', (req,res) => {
    const { error } = validateCourse(req.body) ;
    if(error) return res.status(400).send({data: null, message: result.error.details[0].message, error:true});
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.send({data: course, message: "course added", error: false});
});



router.put('/:id', (req,res)=>{
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


router.delete('/:id',(req,res)=>{
    const course=courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) return res.status(404).send('Given id is not found');
    
    const index=courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
});



function validateCourse(genre)
{
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema) ;
}

module.exports=router;
