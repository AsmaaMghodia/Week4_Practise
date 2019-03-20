const express = require('express');
const router = express.Router();
const joi = require('joi');

let borad = [{
        id: 3,
        role: "vic",
        tasks: "manage all branch"
    }

]
router.get('/', (req, res) => {
    res.send(borad);
});



router.post('/', (req, res) => {

    const volunteer_check = valid_data(req.body);
    console.log(volunteer_check);
    if (volunteer_check.error) {
        res.status(400).send(volunteer_check.error.details[0].message);
        return;
    }

    const volunteer = {
        id: borad.length + 1,
        role: req.body.role,
        tasks: req.body.tasks
    };
    borad.push(volunteer);
    res.send(volunteer);
    console.log("add new volunteer");
});

router.put('/:id', (req, res) => {
    const find_volunteer = borad.find(is => is.id === parseInt(req.params.id));
    if (!find_volunteer) {

        res.status(404).send("tis volunteer not found");
    }
    const volunteer_check = valid_data(req.body);
    if (volunteer_check.error) {
        res.status(400).send(volunteer_check.error.details[0].message);
        return;
    }
    find_volunteer.role = req.body.role;
    find_volunteer.tasks = req.body.tasks;
    console.log("put");

    res.send(find_volunteer);

});
router.delete('/:id', (req, res) => {
    const find_volunteer = borad.find(is => is.id === parseInt(req.params.id));
    if (!find_volunteer) {

        res.status(404).send("tis volunteer not found");
    }
    const index = borad.indexOf(find_volunteer);
    const remove_volunteer = borad.splice(index, 1);
    res.send(remove_volunteer);



});

function valid_data(volunteer) {
    const schema = {
        role: joi.string().min(2).required(),
        tasks: joi.string().required()
    };
    return joi.validate(volunteer, schema);

}




module.exports = router;