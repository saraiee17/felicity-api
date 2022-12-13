const router = require("express").Router();
const knex = require("../knexConfig");
const {v4: uuidv4} = require('uuid');

//to POST emotion
router.post("/", (req, res) => {
    const { user_id, emotion} = req.body; 
    // Create the new user
    const newEmotion = {
      ...req.body,
    };
    
    newEmotion.id = uuidv4();

    knex("emotions")
      .insert(newEmotion)
      .then(() => {
        res.status(201).send("Submitted successfully");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Failed send");
      });
  });


//to GET emotion
router.get("/:id", (req, res) => {
  knex("emotions")
    .select('*')
    .where('user_id' === req.params.id)
    .then((emotions) => {
      console.log(emotions)
      res.status(201).send("Here you go");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Get request unsuccessful");
    });
});
module.exports = router;