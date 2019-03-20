const express = require('express');
const router = express.Router();
const joi = require('joi');
let leaders = [{
        id: 2,
        committee: "PR",
        tasks: "lead his team"
    }

]
//////

router.get('/', (req, res) => {
    res.send(leaders);
});



router.post('/', (req, res) => {
    console.log("hj");
    const volunteer_check = valid_data(req.body);
    console.log(volunteer_check);
    if (volunteer_check.error) {
        res.status(400).send(volunteer_check.error.details[0].message);
        return;
    }

    const volunteer = {
        id: leaders.length + 1,
        committee: req.body.committee,
        tasks: req.body.tasks
    };
    leaders.push(volunteer);
    res.send(volunteer);
    console.log("add new volunteer");
});

router.put('/:id', (req, res) => {
    const find_volunteer = leaders.find(is => is.id === parseInt(req.params.id));
    if (!find_volunteer) {

        res.status(404).send("tis volunteer not found");
    }
    const volunteer_check = valid_data(req.body);
    if (volunteer_check.error) {
        res.status(400).send(volunteer_check.error.details[0].message);
        return;
    }
    find_volunteer.committee = req.body.committee;
    find_volunteer.tasks = req.body.tasks;
    console.log("put");

    res.send(find_volunteer);

});
router.delete('/:id', (req, res) => {
    const find_volunteer = leaders.find(is => is.id === parseInt(req.params.id));
    if (!find_volunteer) {

        res.status(404).send("tis volunteer not found");
    }
    const index = leaders.indexOf(find_volunteer);
    const remove_volunteer = leaders.splice(index, 1);
    res.send(remove_volunteer);



});

function valid_data(volunteer) {
    const schema = {
        committee: joi.string().min(2).required(),
        tasks: joi.string().required()
    };
    return joi.validate(volunteer, schema);

}




module.exports = router;

//for test
/*{
    "committee": "hr",
    "tasks": "lead  team"
}*/