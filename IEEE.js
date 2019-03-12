const joi = require ('joi');
const express = require ('express');
const app = express();
app.listen(5000);
app.use (express.json());
 let volunteerData =[
     {id :1 , name :"asmaa" , age : 21},
     {id :10 , name :"alaa" , age : 21},
     {id :3 , name :"yomna" , age : 21},
     {id :4 , name :"toka" , age : 21},
     {id :5 , name :"sara" , age : 21}
 ];
 app.get ('/ieee/volunteerdata/get',(req,res)=>{
     
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



 app.post ('/ieee/volunteerdata/post',(req,res)=>{
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
        age : req.body.age
    };
    volunteerData.push(volunteer);
    res.send(volunteer);
    console.log("add new volunteer");
});

app.put('/ieee/volunteerdata/put/:id',(req,res)=>{
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
    console.log("put");

    res.send( find_volunteer);
   
});
app.delete('/ieee/volunteerdata/del/:id',(req,res)=>{
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
    const schema = {
        name : joi.string().min(4).required(),
        age : joi.number().required()
    };
    return joi.validate(volunteer,schema);

}

