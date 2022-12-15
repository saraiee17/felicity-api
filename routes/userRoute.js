const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const knex = require("../knexConfig");

/* CREATE new user */
router.post("/signup", (req, res) => {
    const { first_name, last_name, email, password } = req.body;
  
    // If any fields are missing, return
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send("Please enter the required fields.");
    }
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    // Create the new user
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
  
    knex("users")
      .insert(newUser)
      .then(() => {
        res.status(201).send("Registered successfully");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send("Failed registration");
      });
  });
  
  /* LOGIN user */
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    // If any fields are missing, return
    if (!email || !password) {
      return res.status(400).send("Please enter the required fields.");
    }
  
    // Find the user
    knex("users")
      .where({ email: email })
      .first()
      .then((user) => {
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  
        if (!isPasswordCorrect) {
          return res.status(400).send("Invalid password");
        }
  
        const token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.JWT_KEY,
          { expiresIn: "24h" }
        );
  
        res.json({ token, user });
      })
      .catch(() => {
        res.status(400).send("Invalid credentials");
      });
  });
  
  /* GET current user */
  router.get("/calendar", (req, res) => {
    // If there is no auth header provided
    if (!req.headers.authorization) return res.status(401).send("Please login");
  
    // Parse the Bearer token
    const authToken = req.headers.authorization.split(" ")[1];
  
    // Verify the token
    jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid auth token");
      }
  
      knex("users")
        .where({ email: decoded.email })
        .first()
        .then((user) => {
          // Respond with the user data
          res.json(user);
        })
        .catch((error)=>{
          console.log(error)
        })
    });
  });
  
  module.exports = router;