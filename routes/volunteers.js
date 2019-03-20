const express = require ('express');
var moment = require('moment');
const router = express.Router();
const joi = require ('joi');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

let volunteerData = [{
   
    id: 1,
    name: "toka",
    age: 21,
    joinDate:  (new Date(2000, 6, 7)).toDateString(),
    skills: ["Teamwork","Leadership"],
    position : {role: "Volunteer,", roleId: "20"},
    committee: "Fr"
},
{
    id: 2,
    name: "sara",
    age: 21,
    joinDate: (new Date(2010, 8, 1)).toDateString(),
    skills: ["Flexibility","Problem Solving"],
    position : {role: "leader,", roleId: "5"},
    committee: "pr"
},
{
    id: 3,
    name: "Esraa",
    age: 20,
    joinDate: (new Date(2013, 1, 1)).toDateString(),
    skills: ["Teamwork","Self-Motivation"],
    position : {role: "boradMemberer,", roleId: "100"},
    committee: "PR"
},


];
 
 router.get ('/',(req,res) => {
    
            if (req.query.sortBy === "dsc") {
                console.log("des")
                res.send(volunteerData.sort((a, b) => {if (a.name < b.name)  
                    return 1
                    else 
                    return -1 ;
                }));
            }
            else if (req.query.sortBy === "asc") {
               
                res.send(volunteerData.sort((a, b) => {if (a.name > b.name)  
                    return 1
                    else 
                    return -1 ;
                })); }
                
     res.send(volunteerData);
     
    
    
 });



 router.post ('/',(req,res)=>{
     console.log("post");
     const volunteer_check = valid_data(req.body);
     console.log(volunteer_check);
     if (volunteer_check.error){
         res.status(400).send(volunteer_check.error.details[0].message);
         return;
     }
    
    const volunteer = {
        id : volunteerData.length +1,
        name: req.body.name,
        age : req.body.age,
        committee: req.body.committee,
       joinDate: req.body.joinDate ,
        skills:req.body.skills ,
        position : req.body.position ,
        
    };
    if(volunteer.joinDate === '' || volunteer.joinDate === undefined){
        volunteer.joinDate = moment().format('YYYY-MM-DD');
   }
    volunteerData.push(volunteer);
    res.send(volunteer);
    console.log("add new add");
});

router.put('/:id',(req,res)=>{
    console.log("sdffffffffffd");
    const find_volunteer = volunteerData.find(is => is.id === parseInt( req.params.id));
    if(!find_volunteer){
        res.send(volunteerData);
        res.status(404).send("tis volunteer not found");
    }
    const volunteer_check = valid_data(req.body);
    if (volunteer_check.error){
        res.status(400).send(volunteer_check.error.details[0].message);
        return;
    }
    find_volunteer.name = req.body.name;
    find_volunteer.age = req.body.age;
    find_volunteer.committee = req.body.committee;
       find_volunteer.joinDate= req.body.joinDate ;
        find_volunteer.skills= req.body.skills ;
        find_volunteer.position = req.body.position ;
    console.log("put");

    res.send( find_volunteer);
   
});
router.delete('/:id',(req,res)=>{
    const find_volunteer = volunteerData.find(is => is.id === parseInt( req.params.id));
    if(!find_volunteer){
        res.send(volunteerData);
        res.status(404).send("tis volunteer not found");
    }
    const index = volunteerData.indexOf(find_volunteer);
    const remove_volunteer=  volunteerData.splice(index,1);
    res.send(remove_volunteer);

   

});

function valid_data(volunteer){
    const { check } = require('express-validator/check')
    const schema = {
        name : joi.string().min(4).required(),
        age : joi.number().required(),
       committee:joi.string().min(2).required(),
        joinDate: Joi.date().format('YYYY-MM-DD').allow(''),
        skills: Joi.array().items(Joi.string()),
        position: joi.object().keys({
            role: joi.string().required(),
            roleId: joi.number().required()
          }).required(),
       
    }
    return joi.validate(volunteer,schema);

}
module.exports = router;
module.exports.volunteerData = "volunteerDat";

////for test
/* {"name": "ayaaa",
        "age" : "15",
        "committee" :"jgiakr",
        "skills" : ["skill1", "skill2"],
        "position" : {"role":"leader","roleId":"5"}
 	
 }*/